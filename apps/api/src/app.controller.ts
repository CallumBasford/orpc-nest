import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

const names = [];

export async function createAppController() {
  const { Implement, implement } = await import('@orpc/nest');
  const { contract } = await import('@repo/contract');

  @Controller()
  class AppController {
    constructor(public readonly appService: AppService) {}

    @Implement(contract.hello)
    getHello() {
      return implement(contract.hello).handler(({ input }) => {
        return {
          message: this.appService.getHello(input.name),
        };
      });
    }

    @Implement(contract.test)
    test() {
      return implement(contract.test).handler(({ input }) => {
        return this.appService.test(input.name);
      });
    }
  }

  return AppController;
}
