import { A } from "./example1";
import { B } from "./example2";
import { Register } from "./pattern/register";
import { IContainer } from "./pattern/IContainer";

@Register
export class App {
  constructor(private a: A, private b: B) {}
  testCode(): void {
    this.a.logger("testing depency injection");
    this.b.testLog("testing depency injection");
  }
}

/* 
  here the magic comes
*/

const app = IContainer.instance.resolve<App>("App");
app.testCode();
