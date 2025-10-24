import os
import requests
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()


class ParasutService:
    """
    Paraşüt API entegrasyon servisi
    https://api.parasut.com/docs
    """
    
    def __init__(self):
        self.base_url = "https://api.parasut.com/v4"
        self.client_id = os.getenv("PARASUT_CLIENT_ID")
        self.client_secret = os.getenv("PARASUT_CLIENT_SECRET")
        self.username = os.getenv("PARASUT_USERNAME")
        self.password = os.getenv("PARASUT_PASSWORD")
        self.company_id = os.getenv("PARASUT_COMPANY_ID")
        self.access_token = None
        self.token_expiry = None
        
    def _get_access_token(self) -> str:
        """Paraşüt API access token al"""
        # Token varsa ve geçerliyse mevcut token'ı kullan
        if self.access_token and self.token_expiry and datetime.now() < self.token_expiry:
            return self.access_token
        
        # Yeni token al
        auth_url = "https://api.parasut.com/oauth/token"
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "username": self.username,
            "password": self.password,
            "grant_type": "password",
            "redirect_uri": "urn:ietf:wg:oauth:2.0:oob"
        }
        
        response = requests.post(auth_url, data=data)
        response.raise_for_status()
        
        token_data = response.json()
        self.access_token = token_data["access_token"]
        # Token 2 saat geçerli
        self.token_expiry = datetime.now() + timedelta(seconds=token_data.get("expires_in", 7200))
        
        return self.access_token
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Paraşüt API'ye istek gönder"""
        token = self._get_access_token()
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        url = f"{self.base_url}/{self.company_id}/{endpoint}"
        
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=data)
        elif method == "PUT":
            response = requests.put(url, headers=headers, json=data)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers)
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")
        
        response.raise_for_status()
        return response.json()
    
    def create_or_get_contact(self, customer_data: Dict[str, Any]) -> str:
        """Müşteri oluştur veya mevcut müşteriyi getir"""
        # Önce müşteri var mı kontrol et (email veya tax_number ile)
        email = customer_data.get("email")
        tax_number = customer_data.get("tax_number")
        
        # Müşteri ara
        search_params = f"filter[email]={email}" if email else ""
        if tax_number:
            search_params = f"filter[tax_number]={tax_number}"
        
        try:
            if search_params:
                result = self._make_request("GET", f"contacts?{search_params}")
                if result.get("data"):
                    return result["data"][0]["id"]
        except:
            pass  # Müşteri bulunamadı, yeni oluştur
        
        # Yeni müşteri oluştur
        contact_payload = {
            "data": {
                "type": "contacts",
                "attributes": {
                    "contact_type": "company" if customer_data.get("tax_number") else "person",
                    "name": customer_data["name"],
                    "email": email,
                    "tax_office": customer_data.get("tax_office"),
                    "tax_number": tax_number,
                    "city": customer_data.get("city"),
                    "address": customer_data.get("address"),
                    "country": customer_data.get("country", "TR")
                }
            }
        }
        
        response = self._make_request("POST", "contacts", contact_payload)
        return response["data"]["id"]
    
    def create_invoice(self, invoice_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Fatura oluştur
        
        invoice_data format:
        {
            "customer": {...},
            "items": [{description, quantity, unit_price, vat_rate}],
            "invoice_date": "2025-01-01",
            "due_date": "2025-01-15",
            "notes": "..."
        }
        """
        try:
            # Müşteri ID'sini al veya oluştur
            contact_id = self.create_or_get_contact(invoice_data["customer"])
            
            # Fatura kalemleri hazırla
            invoice_items = []
            for item in invoice_data["items"]:
                invoice_items.append({
                    "type": "sales_invoice_details",
                    "attributes": {
                        "description": item["description"],
                        "quantity": item["quantity"],
                        "unit_price": item["unit_price"],
                        "vat_rate": item.get("vat_rate", 20)
                    }
                })
            
            # Fatura tarihleri
            invoice_date = invoice_data.get("invoice_date", datetime.now().strftime("%Y-%m-%d"))
            due_date = invoice_data.get("due_date", 
                                       (datetime.now() + timedelta(days=15)).strftime("%Y-%m-%d"))
            
            # Fatura payload
            invoice_payload = {
                "data": {
                    "type": "sales_invoices",
                    "attributes": {
                        "item_type": "invoice",
                        "description": invoice_data.get("notes", "ExportIQ 360 Assessment Paketi"),
                        "issue_date": invoice_date,
                        "due_date": due_date,
                        "currency": invoice_data.get("currency", "TRY"),
                        "billing_address": invoice_data["customer"].get("address"),
                        "billing_city": invoice_data["customer"].get("city"),
                    },
                    "relationships": {
                        "contact": {
                            "data": {
                                "type": "contacts",
                                "id": contact_id
                            }
                        },
                        "details": {
                            "data": invoice_items
                        }
                    }
                }
            }
            
            # Fatura oluştur
            response = self._make_request("POST", "sales_invoices", invoice_payload)
            
            invoice_id = response["data"]["id"]
            invoice_number = response["data"]["attributes"]["invoice_no"]
            
            # Toplam tutar hesapla
            total = sum(
                item["quantity"] * item["unit_price"] * (1 + item.get("vat_rate", 20) / 100)
                for item in invoice_data["items"]
            )
            
            return {
                "success": True,
                "invoice_id": invoice_id,
                "invoice_number": invoice_number,
                "invoice_url": f"https://uygulama.parasut.com/{self.company_id}/satislar/faturalar/{invoice_id}",
                "total_amount": round(total, 2),
                "error": None
            }
            
        except Exception as e:
            return {
                "success": False,
                "invoice_id": None,
                "invoice_number": None,
                "invoice_url": None,
                "total_amount": None,
                "error": str(e)
            }
    
    def get_invoice(self, invoice_id: str) -> Dict[str, Any]:
        """Fatura detaylarını getir"""
        return self._make_request("GET", f"sales_invoices/{invoice_id}")
    
    def send_invoice_email(self, invoice_id: str, email: str) -> bool:
        """Faturayı email ile gönder"""
        try:
            endpoint = f"sales_invoices/{invoice_id}/email"
            data = {"email": email}
            self._make_request("POST", endpoint, data)
            return True
        except:
            return False
