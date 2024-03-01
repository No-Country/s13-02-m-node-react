declare namespace NodeJs {
  interface processEnv {
    PORT: number;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_HOST: string;
    POSTGERS_PORT: number;
    JWTAUTH_SECRET: string;
    JWTAUTH_EXPIRESIN: string;
    OPENAI_API_KEY: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
  }
}
