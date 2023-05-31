interface IEnvConfig {
  env: string;
  disableSwagger: boolean;
  http: {
    port: number;
    allowHosts: string[];
    allowCredentials: boolean;
  };
  db: {
    type: 'mysql' | 'postgres';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dbDrop: boolean;
    dbSync: boolean;
    dbLogging: boolean;
    dbLogger: 'debug' | 'advanced-console' | 'simple-console' | 'file';
  };
  auth: {
    jwt: {
      secretKey: string;
      expiredAt: string;
    };
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    s3: {
      bucketName: string;
      bucketResizeName: string;
      bucketRegion: string;
      signedUrlExpires: number;
    };
  };
}

export default IEnvConfig;
