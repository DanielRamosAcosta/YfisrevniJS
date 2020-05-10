import { injectable } from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts"

import { Weapon } from "../../interfaces/index.ts"

@injectable()
export class Katana implements Weapon {
  public name: string
  public constructor() {
    this.name = "Katana"
  }
}
