import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts"
import { Container, injectable, inject, decorate } from "../mod.ts"

const withinContext = (context: string) => (name: string) => `[${context}] ${name}`

const withinPropertyInjection = withinContext("YfisrevniJS")

Deno.test({
  name: withinPropertyInjection("Should be able to resolve and inject dependencies"),
  fn: () => {
    interface Ninja {
      fight(): string
      sneak(): string
    }

    interface Katana {
      hit(): string
    }

    interface Shuriken {
      throw(): string
    }

    @injectable()
    class Katana implements Katana {
      public hit() {
        return "cut!"
      }
    }

    @injectable()
    class Shuriken implements Shuriken {
      public throw() {
        return "hit!"
      }
    }

    @injectable()
    class Ninja implements Ninja {
      private _katana: Katana
      private _shuriken: Shuriken

      public constructor(@inject("Katana") katana: Katana, @inject("Shuriken") shuriken: Shuriken) {
        this._katana = katana
        this._shuriken = shuriken
      }

      public fight() {
        return this._katana.hit()
      }
      public sneak() {
        return this._shuriken.throw()
      }
    }

    const container = new Container()
    container.bind<Ninja>("Ninja").to(Ninja)
    container.bind<Katana>("Katana").to(Katana)
    container.bind<Shuriken>("Shuriken").to(Shuriken)

    const ninja = container.get<Ninja>("Ninja")

    expect(ninja.fight()).toEqual("cut!")
    expect(ninja.sneak()).toEqual("hit!")
  },
})

Deno.test({
  name: withinPropertyInjection("Should be able to resolve and inject dependencies in VanillaJS"),
  fn: () => {
    const TYPES = {
      Katana: "Katana",
      Ninja: "Ninja",
      Shuriken: "Shuriken",
    }

    class Katana {
      public hit() {
        return "cut!"
      }
    }

    class Shuriken {
      public throw() {
        return "hit!"
      }
    }

    class Ninja {
      public _katana: Katana
      public _shuriken: Shuriken

      public constructor(katana: Katana, shuriken: Shuriken) {
        this._katana = katana
        this._shuriken = shuriken
      }
      public fight() {
        return this._katana.hit()
      }
      public sneak() {
        return this._shuriken.throw()
      }
    }

    decorate(injectable(), Katana)
    decorate(injectable(), Shuriken)
    decorate(injectable(), Ninja)
    decorate(inject(TYPES.Katana), Ninja, 0)
    decorate(inject(TYPES.Shuriken), Ninja, 1)

    const container = new Container()
    container.bind<Ninja>(TYPES.Ninja).to(Ninja)
    container.bind<Katana>(TYPES.Katana).to(Katana)
    container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken)

    const ninja = container.get<Ninja>(TYPES.Ninja)

    expect(ninja.fight()).toEqual("cut!")
    expect(ninja.sneak()).toEqual("hit!")
  },
})
