type Ctr<T = any> = new (...args: any[]) => T;

const Injectable = (): Ctr => taget => {}

class OtherService {
  a = 1
}