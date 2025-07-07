import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Implement, implement } from '@orpc/nest';
import { contract } from '@repo/contract';

const names = [];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
