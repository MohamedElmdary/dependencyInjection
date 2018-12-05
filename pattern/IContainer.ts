import "reflect-metadata";

export class IContainer {
  private static _instace: IContainer = new IContainer();
  private _deps: { [key: string]: Object } = {};
  private constructor() {
    if (IContainer._instace) throw new Error("Instance already exists");
    IContainer._instace = this;
  }

  public static get instance() {
    return IContainer._instace;
  }

  register(name: string, deps: any[], implementation: any) {
    if (this._deps[name]) return;
    if (deps.length > 0) {
      deps = deps.map(dep => this.treeDep(dep));
    }
    this._deps[name] = new implementation(...deps);
  }

  resolve<T>(name: string): T {
    if (!this._deps[name]) throw new Error("dep not exists");
    return this._deps[name] as T;
  }

  treeDep(dep: any): any {
    let deps = Reflect.getMetadata("design:paramtypes", dep) || [];
    if (deps.length > 0) {
      deps = deps.map((d: any) => this.treeDep(d));
    }
    this.register(dep.name, deps, dep);
    console.log(this.resolve(dep.name));
    return this.resolve(dep.name);
  }
}
