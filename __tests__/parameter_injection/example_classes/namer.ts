import { injectable, inject } from "../../../mod.ts"
import { Greeter, GREETER_SYMBOL } from "./greeter.ts"

export const NAMER_SYMBOL = Symbol("Namer")

@injectable()
export class Namer {
  private greeter: Greeter

  public constructor(@inject(GREETER_SYMBOL) greeter: Greeter) {
    this.greeter = greeter
  }

  public greetWith(name: string) {
    return `${name} ${this.greeter.greet()}`
  }
}
