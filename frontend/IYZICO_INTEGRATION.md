# iyzico Ödeme Entegrasyonu

## Frontend - Backend İletişimi

Frontend'den `/checkout` sayfası üzerinden toplanan bilgiler backend'e gönderilir ve iyzico API'si ile ödeme işlenir.

## Backend Kurulumu (Node.js Örneği)

### 1. Gerekli Paketler

```bash
npm install iyzipay
npm install express body-parser cors
```

### 2. iyzico Konfigürasyonu

```javascript
// config/iyzico.js
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://api.iyzipay.com' 
    : 'https://sandbox-api.iyzipay.com'
});

module.exports = iyzipay;
```

### 3. Ödeme API Endpoint

```javascript
// routes/payment.js
const express = require('express');
const router = express.Router();
const iyzipay = require('../config/iyzico');

router.post('/iyzico', async (req, res) => {
  const {
    price,
    paidPrice,
    currency,
    installment,
    basketId,
    paymentChannel,
    paymentGroup,
    paymentCard,
    buyer,
    billingAddress,
    basketItems
  } = req.body;

  try {
    // iyzico ödeme isteği
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: basketId,
      price: price,
      paidPrice: paidPrice,
      currency: currency || Iyzipay.CURRENCY.TRY,
      installment: installment || '1',
      basketId: basketId,
      paymentChannel: paymentChannel || Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: paymentGroup || Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: paymentCard.cardHolderName,
        cardNumber: paymentCard.cardNumber,
        expireMonth: paymentCard.expireMonth,
        expireYear: paymentCard.expireYear,
        cvc: paymentCard.cvc,
        registerCard: paymentCard.registerCard || '0'
      },
      buyer: {
        id: buyer.id,
        name: buyer.name,
        surname: buyer.surname,
        gsmNumber: buyer.gsmNumber,
        email: buyer.email,
        identityNumber: buyer.identityNumber,
        lastLoginDate: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
        registrationDate: buyer.registrationDate || new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
        registrationAddress: buyer.registrationAddress,
        ip: req.ip || buyer.ip,
        city: buyer.city,
        country: buyer.country,
        zipCode: buyer.zipCode
      },
      shippingAddress: {
        contactName: billingAddress.contactName,
        city: billingAddress.city,
        country: billingAddress.country,
        address: billingAddress.address,
        zipCode: billingAddress.zipCode
      },
      billingAddress: {
        contactName: billingAddress.contactName,
        city: billingAddress.city,
        country: billingAddress.country,
        address: billingAddress.address,
        zipCode: billingAddress.zipCode
      },
      basketItems: basketItems.map(item => ({
        id: item.id,
        name: item.name,
        category1: item.category1,
        itemType: item.itemType || Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: item.price
      }))
    };

    // iyzico API çağrısı
    iyzipay.payment.create(request, (err, result) => {
      if (err) {
        console.error('iyzico Error:', err);
        return res.status(500).json({
          success: false,
          error: 'Ödeme işlemi başarısız',
          details: err
        });
      }

      if (result.status === 'success') {
        // Ödeme başarılı - veritabanına kaydet
        // savePaymentToDatabase(result);
        // updateUserSubscription(buyer.id, basketItems[0].id);

        return res.json({
          success: true,
          paymentId: result.paymentId,
          conversationId: result.conversationId,
          message: 'Ödeme başarılı'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.errorMessage || 'Ödeme reddedildi',
          errorCode: result.errorCode
        });
      }
    });

  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası'
    });
  }
});

module.exports = router;
```

### 4. Ana Server Dosyası

```javascript
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 5. Environment Variables (.env)

```env
# iyzico Credentials (Sandbox - Test için)
IYZICO_API_KEY=sandbox-your-api-key
IYZICO_SECRET_KEY=sandbox-your-secret-key

# Production'da değiştir
NODE_ENV=development

# Server
PORT=5000
```

## Frontend'de API Çağrısı

Frontend'deki `Checkout.tsx` dosyasında yorum satırını kaldırın:

```typescript
const response = await fetch('http://localhost:5000/api/payment/iyzico', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(paymentData)
});

const result = await response.json();

if (result.success) {
  alert('Ödeme başarılı! Paketiniz aktifleştirildi.');
  navigate('/dashboard', { 
    state: { 
      paymentSuccess: true,
      plan: state.planKey,
      paymentId: result.paymentId
    } 
  });
} else {
  alert(`Ödeme başarısız: ${result.error}`);
}
```

## Test Kartları (iyzico Sandbox)

### Başarılı Test Kartları:
- **Kart No:** 5528 7900 0000 0001
- **CVV:** 123
- **Son Kullanma Tarihi:** 12/30
- **3D Secure Şifre:** 123456

### Hata Test Kartları:
- **Yetersiz Bakiye:** 5406 6700 0000 0009
- **Kart Tanımsız:** 4766 6200 0000 0001

## Güvenlik Notları

1. **API Key ve Secret Key'i asla frontend'de tutmayın**
2. **HTTPS kullanın** (production'da zorunlu)
3. **CORS ayarlarını** doğru yapılandırın
4. **Rate limiting** ekleyin
5. **IP whitelist** kullanın (iyzico panel'den)
6. **Webhook'ları** güvenli doğrulayın

## iyzico Dashboard

Test ve production ortamları için:
- **Sandbox:** https://sandbox-merchant.iyzipay.com
- **Production:** https://merchant.iyzipay.com

## Entegrasyon Adımları

1. ✅ Frontend checkout sayfası hazır
2. ⏳ Backend API endpoint'i oluştur
3. ⏳ iyzico hesabı aç (sandbox ile başla)
4. ⏳ API keys al
5. ⏳ Test kartları ile dene
6. ⏳ 3D Secure entegrasyonu
7. ⏳ Webhook entegrasyonu
8. ⏳ Production'a geç

## Ödeme Sonrası İşlemler

```javascript
async function handleSuccessfulPayment(paymentData) {
  // 1. Veritabanına kaydet
  await Payment.create({
    userId: paymentData.userId,
    paymentId: paymentData.paymentId,
    amount: paymentData.amount,
    plan: paymentData.plan,
    status: 'completed'
  });

  // 2. Kullanıcı aboneliğini güncelle
  await User.update(
    { 
      plan: paymentData.plan,
      planStartDate: new Date(),
      planEndDate: new Date(Date.now() + 30*24*60*60*1000) // 30 gün
    },
    { where: { id: paymentData.userId } }
  );

  // 3. Email gönder
  await sendPaymentSuccessEmail(paymentData.userEmail, {
    plan: paymentData.plan,
    amount: paymentData.amount
  });

  // 4. Fatura oluştur
  await generateInvoice(paymentData);
}
```

## Webhook Entegrasyonu

```javascript
// Ödeme durumu değişikliklerini dinle
router.post('/webhook', async (req, res) => {
  const { paymentId, status, conversationId } = req.body;

  // iyzico webhook doğrulama
  const isValid = verifyIyzicoWebhook(req);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Ödeme durumunu güncelle
  await updatePaymentStatus(paymentId, status);

  res.json({ status: 'OK' });
});
```

## Destek

iyzico Dokümantasyon: https://dev.iyzipay.com/tr
iyzico GitHub: https://github.com/iyzico

## Notlar

- Bu entegrasyon **mock/test modda** çalışıyor
- Production için backend implementasyonu gerekli
- Tüm hassas bilgiler backend'de işlenmeli
- PCI-DSS uyumluluğu için iyzico'nun güvenlik standartlarını takip edin
