import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MediaModule } from '../../media/src/media.module';

async function bootstrap() {
  process.title = 'search';
  const logger = new Logger('SearchBootstrap');
  const PORT = Number(process.env.SEARCH_TCP_PORT ?? 4012)

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

  logger.log(`Search microservices (TCP) listening on port ${PORT}`);
}
bootstrap();
