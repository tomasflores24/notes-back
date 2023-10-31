declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: number;

    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
