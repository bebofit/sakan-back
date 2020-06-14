export interface IConfig {
  FRONTEND_URL: string;
  JWT_SECRET: string;
  DB_HOST: string;
  DB_HOST_LOCAL: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  S3_ACCESS_KEY: string;
  S3_SECRET_KEY: string;
  NODE_ENV: "development" | "testing" | "production" | "staging";
  PORT: number;
  CRYPTO_SECRET: string;
}
