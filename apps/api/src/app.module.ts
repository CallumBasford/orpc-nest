import { Module } from '@nestjs/common';

import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { onError, ORPCModule } from '@orpc/nest';

@Module({
  imports: [
    ORPCModule.forRoot({
      interceptors: [
        onError((error) => {
          console.error(error);
        }),
      ],
      eventIteratorKeepAliveInterval: 5000, // 5 seconds
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
