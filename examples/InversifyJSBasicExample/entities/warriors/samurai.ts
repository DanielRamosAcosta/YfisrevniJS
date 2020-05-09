import { injectable, inject } from "../../../../mod.ts"

import SERVICE_IDENTIFIER from "../../constants/identifiers.ts"
import { Weapon, Warrior } from "../../interfaces/index.ts"

@injectable()
export class Samurai implements Warrior {
  public name: string
  public weapon: Weapon
  public constructor(@inject(SERVICE_IDENTIFIER.WEAPON) weapon: Weapon) {
    this.name = "Samurai"
    this.weapon = weapon
  }
}
