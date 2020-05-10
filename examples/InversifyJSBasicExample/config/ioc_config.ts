import { Container } from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/mod.ts"

import { Battle, Weapon, Warrior } from "../interfaces/index.ts"

import { EpicBattle, Katana, Shuriken, Ninja, Samurai } from "../entities/index.ts"

import SERVICE_IDENTIFIER from "../constants/identifiers.ts"
import TAG from "../constants/tags.ts"

let container = new Container()

container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Ninja).whenTargetNamed(TAG.CHINESE)
container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Samurai).whenTargetNamed(TAG.JAPANESE)
container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Shuriken).whenParentNamed(TAG.CHINESE)
container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Katana).whenParentNamed(TAG.JAPANESE)
container.bind<Battle>(SERVICE_IDENTIFIER.BATTLE).to(EpicBattle)

export default container
