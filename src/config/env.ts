import * as dotenv from 'dotenv';
import IEnvConfig from 'src/types/config/env.interface';

dotenv.config();

const { ...env } = process.env;

const ENV_CONFIG: IEnvConfig = {
  env: env.NODE_ENV,
  disableSwagger: env.DISABLE_SWAGGER === 'true',
  http: {
    port: +env.API_PORT,
    allowHosts: env.ALLOW_HOST ? env.ALLOW_HOST.split(',') : [],
    allowCredentials: env.ACCESS_CONTROL_ALLOW_CREDENTIALS === 'true',
  },
  db: {
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: +env.DB_PORT,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    dbDrop: env.DB_DROP === 'true',
    dbSync: env.DB_SYNC === 'true',
    dbLogging: env.DB_LOGGING === 'true',
    dbLogger: env.DB_LOGGER as any,
  },
  auth: {
    jwt: {
      secretKey: env.JWT_SECRET_KEY,
      expiredAt: env.JWT_EXPIRED_AT,
    },
  },
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucketName: env.S3_BUCKET_NAME,
      bucketResizeName: env.S3_BUCKET_RESIZE_NAME,
      bucketRegion: env.S3_BUCKET_REGION,
      signedUrlExpires: +env.S3_SIGNED_URL_EXPIRES_IN,
    },
  },
};

export default ENV_CONFIG;
