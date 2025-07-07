import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private names: string[] = [];
  getHello(name?: string): string {
    return `Hello ${name ?? 'World'}!`;
  }
  test(name: string) {
    this.names.push(name);
    console.log(this.names);
    return this.names;
  }
}
