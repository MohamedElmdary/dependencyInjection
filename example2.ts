import { Register } from "./pattern/register";
import { A } from "./example1";

@Register
export class B {
  constructor(private a: A) {}
  testLog(msg: string) {
    this.a.logger(msg + 'from "B"');
  }
}
