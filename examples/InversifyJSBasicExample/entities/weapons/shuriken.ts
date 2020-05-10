import { injectable } from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts"

import { Weapon } from "../../interfaces/index.ts"

@injectable()
export class Shuriken implements Weapon {
  public name: string
  public constructor() {
    this.name = "Shuriken"
  }
}
