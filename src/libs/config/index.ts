import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  graphql: {
    sandbox: process.env.GRAPHQL_SANDBOX === 'true',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(','),
  },
  gcp: {
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      clientId: process.env.GCP_CREDENTIALS_CLIENT_ID,
      clientEmail: process.env.GCP_CREDENTIALS_CLIENT_EMAIL,
      privateKey: (process.env.GCP_CREDENTIALS_PRIVATE_KEY ?? '')
        .split(String.raw`\n`)
        .join('\n'),
      type: process.env.GCP_CREDENTIALS_TYPE,
    },
    storage: {
      bucketName: process.env.GCP_STORAGE_BUCKET_NAME,
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    credentials: {
      clientEmail: process.env.FIREBASE_CREDENTIALS_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_CREDENTIALS_PRIVATE_KEY ?? '')
        .split(String.raw`\n`)
        .join('\n'),
    },
    client: {
      apiKey: process.env.FIREBASE_CLIENT_API_KEY,
      authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
      storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_CLIENT_APP_ID,
    },
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY ?? '',
    sandbox: process.env.BREVO_SANDBOX === 'true',
  },
} as const;

export type Config = typeof config;
