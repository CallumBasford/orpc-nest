import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { OpenAPIGenerator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod';
import { contract } from '@repo/contract';
import { apiReference } from '@scalar/nestjs-api-reference'


const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [
    new ZodToJsonSchemaConverter(),
  ],
})

const spec = await openAPIGenerator.generate(contract, {
  info: {
    title: 'API',
    version: '1.0.0',
  },
  servers: [
    { url: '/api' }, /** Should use absolute URLs in production */
  ],
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: 'http://localhost:4001',
  });
  
  app.use(
    '/reference',
    apiReference({
      content: spec,
    }),
  )

  app.setGlobalPrefix('api');

  await app.listen(4000);
}
bootstrap();
