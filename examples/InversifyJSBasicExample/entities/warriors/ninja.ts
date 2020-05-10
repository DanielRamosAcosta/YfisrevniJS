import {
  injectable,
  inject,
} from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts"

import SERVICE_IDENTIFIER from "../../constants/identifiers.ts"
import { Warrior, Weapon } from "../../interfaces/index.ts"

@injectable()
export class Ninja implements Warrior {
  public name: string
  public weapon: Weapon
  public constructor(@inject(SERVICE_IDENTIFIER.WEAPON) weapon: Weapon) {
    this.name = "Ninja"
    this.weapon = weapon
  }
}
