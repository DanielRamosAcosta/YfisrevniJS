import { injectable } from "../../../mod.ts"
import { Flyable } from "./flyable.ts"

@injectable()
export class FlyablePlane implements Flyable {
  public fly() {
    return "The sky is the limit!"
  }
}
