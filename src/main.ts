import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LoggingService } from './common/logging/logging.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggingService = app.get(LoggingService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  process.on('uncaughtException', (error: Error) => {
    loggingService.error(
      `Uncaught Exception: ${error.message}`,
      error.stack,
      'Process',
    );
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    const errorMessage =
      reason instanceof Error
        ? reason.message
        : typeof reason === 'string'
          ? reason
          : JSON.stringify(reason);
    const errorStack =
      reason instanceof Error ? reason.stack : undefined;

    loggingService.error(
      `Unhandled Rejection: ${errorMessage}`,
      errorStack,
      'Process',
    );
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The Home Library Service API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.getHttpAdapter().get('/doc', (req, res) => {
    res.redirect('/api');
  });

  app.getHttpAdapter().get('/doc-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  loggingService.log(
    `Application is running on: http://localhost:${port}`,
    'Bootstrap',
  );
}
bootstrap();
