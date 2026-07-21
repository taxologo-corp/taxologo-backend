import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const host = process.env.HOST ?? '127.0.0.1';
  const port = process.env.PORT ?? '3000';

  await app.listen(port, host);
}

void bootstrap();
