import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import ENV_CONFIG from './config/env';

const SWAGGER_PREFIX = 'api';
const API_PREFIX = 'api/v1';

function setupSwagger(app: INestApplication) {
  const document = new DocumentBuilder()
    .setTitle('The swagger for NestJS API')
    .setDescription('The NestJs API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();

  const swagger = SwaggerModule.createDocument(app, document);

  SwaggerModule.setup(SWAGGER_PREFIX, app, swagger, {
    swaggerOptions: {
      // to persist auth after refresh page
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ENV_CONFIG.http.allowHosts,
    credentials: ENV_CONFIG.http.allowCredentials,
  });

  // Setup helmet to helps us secure our Express apps by setting various HTTP headers.
  app.use(helmet());

  // Setup app global path prefix
  app.setGlobalPrefix(API_PREFIX);

  // Setup app using class-validator
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Setup app use class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  // Setup Swagger Explorer
  if (!ENV_CONFIG.disableSwagger) setupSwagger(app);

  // Setup app listen port
  await app.listen(ENV_CONFIG.http.port);

  // Log bootstrap done
  const logger = new Logger('bootstrap');
  const URL = await app.getUrl();
  logger.log(`Application is running on: ${URL}`);
  logger.log(`Swagger is running on: ${URL}/${SWAGGER_PREFIX}`);
}
bootstrap();
