import { Container } from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts";
import { TYPES } from "./types.ts";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces.ts";
import { Ninja, Katana, Shuriken } from "./entities.ts";

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };
