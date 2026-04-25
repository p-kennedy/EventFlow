from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DATABASE_URL: str
    ANTHROPIC_API_KEY: str
    ANTHROPIC_MODEL: str = "claude-sonnet-4-20250514"
    TICKETMASTER_API_KEY: str = ""
    APP_ENV: str = "development"
    PORT: int = 8000


settings = Settings()
