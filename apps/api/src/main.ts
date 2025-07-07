import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const dynamicModule = await AppModule.forRoot();
  const app = await NestFactory.create(dynamicModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: 'http://localhost:4001',
  });
  await app.listen(4000);
}
bootstrap();
