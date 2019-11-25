export interface Config {
  FRONTEND_URL: string;
  JWT_SECRET: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  S3_ACCESS_KEY: string;
  S3_SECRET_KEY: string;
  NODE_ENV: 'development' | 'testing' | 'production';
  PORT: number;
}

const config = {} as Config;

Object.keys(process.env).forEach(key => {
  const str = process.env[key];
  const num = Number(str);
  (config as any)[key] = !Number.isNaN(num) ? num : str;
});

export default config;
