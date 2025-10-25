"""
Simple in-memory database service for storing user responses
In production, this should be replaced with a real database (PostgreSQL, MongoDB, etc.)
"""
from typing import Dict, List, Optional
from datetime import datetime
from models import UserResponse
import json

class DatabaseService:
    def __init__(self):
        # In-memory storage: {user_id: {assessment_id: [responses]}}
        self.user_responses: Dict[str, Dict[str, List[Dict]]] = {}
        
    def save_response(self, response: UserResponse) -> bool:
        """Save a single user response"""
        try:
            user_id = response.user_id
            assessment_id = response.assessment_id
            
            # Initialize user if not exists
            if user_id not in self.user_responses:
                self.user_responses[user_id] = {}
            
            # Initialize assessment if not exists
            if assessment_id not in self.user_responses[user_id]:
                self.user_responses[user_id][assessment_id] = []
            
            # Add timestamp if not provided
            if response.timestamp is None:
                response.timestamp = datetime.now()
            
            # Save response
            response_dict = {
                "user_id": response.user_id,
                "user_email": response.user_email,
                "assessment_id": response.assessment_id,
                "question_id": response.question_id,
                "answer": response.answer,
                "timestamp": response.timestamp.isoformat(),
                "package_type": response.package_type
            }
            
            # Check if response already exists (update instead of duplicate)
            existing_idx = None
            for idx, resp in enumerate(self.user_responses[user_id][assessment_id]):
                if resp["question_id"] == response.question_id:
                    existing_idx = idx
                    break
            
            if existing_idx is not None:
                self.user_responses[user_id][assessment_id][existing_idx] = response_dict
            else:
                self.user_responses[user_id][assessment_id].append(response_dict)
            
            return True
        except Exception as e:
            print(f"Error saving response: {e}")
            return False
    
    def save_responses_batch(self, user_id: str, user_email: str, assessment_id: str, 
                            responses: List[Dict], package_type: str) -> Dict:
        """Save multiple responses at once"""
        try:
            saved_count = 0
            for resp_data in responses:
                response = UserResponse(
                    user_id=user_id,
                    user_email=user_email,
                    assessment_id=assessment_id,
                    question_id=resp_data["question_id"],
                    answer=resp_data["answer"],
                    timestamp=datetime.now(),
                    package_type=package_type
                )
                if self.save_response(response):
                    saved_count += 1
            
            return {
                "success": True,
                "saved_count": saved_count,
                "total_count": len(responses)
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_user_responses(self, user_id: str, assessment_id: str) -> List[Dict]:
        """Get all responses for a specific assessment"""
        try:
            if user_id in self.user_responses:
                if assessment_id in self.user_responses[user_id]:
                    return self.user_responses[user_id][assessment_id]
            return []
        except Exception as e:
            print(f"Error getting responses: {e}")
            return []
    
    def get_all_user_assessments(self, user_id: str) -> Dict[str, List[Dict]]:
        """Get all assessments for a user"""
        try:
            if user_id in self.user_responses:
                return self.user_responses[user_id]
            return {}
        except Exception as e:
            print(f"Error getting user assessments: {e}")
            return {}
    
    def delete_assessment(self, user_id: str, assessment_id: str) -> bool:
        """Delete an assessment"""
        try:
            if user_id in self.user_responses:
                if assessment_id in self.user_responses[user_id]:
                    del self.user_responses[user_id][assessment_id]
                    return True
            return False
        except Exception as e:
            print(f"Error deleting assessment: {e}")
            return False
    
    def get_stats(self) -> Dict:
        """Get database statistics"""
        total_users = len(self.user_responses)
        total_assessments = sum(len(assessments) for assessments in self.user_responses.values())
        total_responses = sum(
            len(responses) 
            for user_assessments in self.user_responses.values()
            for responses in user_assessments.values()
        )
        
        return {
            "total_users": total_users,
            "total_assessments": total_assessments,
            "total_responses": total_responses
        }

# Global instance
db_service = DatabaseService()
