export interface Env {
  PORT: number;
  APP_NAME: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production' | 'test';
  API_KEY?: string; // Optional field for API key
  LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
}
