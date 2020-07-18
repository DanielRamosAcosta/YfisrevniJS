import {
  inject,
  injectable,
  named,
} from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts";
import { Battle, Warrior } from "../../interfaces/index.ts";
import SERVICE_IDENTIFIER from "../../constants/identifiers.ts";
import TAG from "../../constants/tags.ts";

@injectable()
export class EpicBattle implements Battle {
  public warrior1: Warrior;
  public warrior2: Warrior;

  constructor(
    @inject(SERVICE_IDENTIFIER.WARRIOR) @named(TAG.CHINESE) warrior1: Warrior,
    @inject(SERVICE_IDENTIFIER.WARRIOR) @named(TAG.JAPANESE) warrior2: Warrior,
  ) {
    this.warrior1 = warrior1;
    this.warrior2 = warrior2;
  }

  public fight() {
    let desc = `FIGHT!
                ${this.warrior1.name} (${this.warrior1.weapon.name})
                vs
                ${this.warrior2.name} (${this.warrior2.weapon.name})`;
    return desc;
  }
}
