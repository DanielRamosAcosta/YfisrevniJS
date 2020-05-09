import { expect } from "../../__tests__/expect.ts"
import { myContainer } from "./inversify.config.ts"
import { TYPES } from "./types.ts"
import { Warrior } from "./interfaces.ts"

const ninja = myContainer.get<Warrior>(TYPES.Warrior)

expect(ninja.fight()).toEqual("cut!") // true
expect(ninja.sneak()).toEqual("hit!") // true
