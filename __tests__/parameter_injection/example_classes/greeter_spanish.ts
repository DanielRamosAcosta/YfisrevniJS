import { Greeter } from "./greeter.ts";
import { injectable } from "../../../mod.ts";

@injectable()
export class GreeterSpanish implements Greeter {
  public greet() {
    return "Hola!";
  }
}
