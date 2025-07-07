import { Module, DynamicModule } from '@nestjs/common';

import { AppService } from './app.service';
import { createAppController } from './app.controller';

@Module({
  providers: [AppService],
})
export class AppModule {
  static async forRoot(): Promise<DynamicModule> {
    const { onError, ORPCModule } = await import('@orpc/nest');
    const AppController = await createAppController();

    return {
      module: AppModule,
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
    };
  }
}
