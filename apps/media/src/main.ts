import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'catalog';
  const logger = new Logger('CatalogBootstrap');
  const PORT = Number(process.env.MEDIA_TCP_PORT ?? 4013)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: PORT
      }
    }
  )
  app.enableShutdownHooks()
  await app.listen();

  logger.log(`Media microservices (TCP) listening on port ${PORT}`);
}
bootstrap();
