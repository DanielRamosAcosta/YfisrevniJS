import Battle from "./interfaces/battle.ts"
import container from "./config/ioc_config.ts"
import SERVICE_IDENTIFIER from "./constants/identifiers.ts"

// Composition root
let epicBattle = container.get<Battle>(SERVICE_IDENTIFIER.BATTLE)

console.log(epicBattle.fight())
