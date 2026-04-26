from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Google AI - Multiple API keys for fallback
    google_api_key: str  # Primary key (for backward compatibility)
    google_api_keys: str = ""  # Comma-separated additional keys
    
    # Firebase
    firebase_project_id: str
    firebase_private_key_id: str
    firebase_private_key: str
    firebase_client_email: str
    firebase_client_id: str
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True
    
    # CORS
    allowed_origins: str = "http://localhost:3000,http://localhost:3001"
    
    @property
    def origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]
    
    @property
    def all_api_keys(self) -> List[str]:
        """Return all available Gemini API keys"""
        keys = [self.google_api_key]
        if self.google_api_keys.strip():
            keys.extend([k.strip() for k in self.google_api_keys.split(",") if k.strip()])
        return keys
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
