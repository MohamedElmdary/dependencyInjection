import "reflect-metadata";
import { IContainer } from "./IContainer";

const container = IContainer.instance;

export function Register(target: any): void {
  const deps = Reflect.getMetadata("design:paramtypes", target) || [];
  container.register(target.name, deps, target);
}
