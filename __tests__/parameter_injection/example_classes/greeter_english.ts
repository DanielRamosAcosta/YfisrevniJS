import { injectable } from "../../../mod.ts"
import { Greeter } from "./greeter.ts"

@injectable()
export class GreeterEnglish implements Greeter {
  public greet() {
    return "Hello!"
  }
}
