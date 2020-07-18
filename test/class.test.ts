import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts";
import "../src/reflect-metadata.ts";
import { Container, injectable, inject, decorate, named } from "../mod.ts";

const withinContext = (context: string) =>
  (name: string) => `[${context}] ${name}`;

const withinPropertyInjection = withinContext("YfisrevniJS");

Deno.test({
  name: withinPropertyInjection(
    "Should be able to use classes as runtime identifiers deep",
  ),
  fn: () => {
    @injectable()
    class Cut {
      public cut() {
        return "cut!";
      }
    }

    @injectable()
    class Katana {
      private _cut: Cut;

      constructor(cut: Cut) {
        this._cut = cut;
      }

      public hit() {
        return this._cut.cut();
      }
    }

    @injectable()
    class Shuriken {
      public throw() {
        return "hit!";
      }
    }

    @injectable()
    class Ninja {
      private _katana: Katana;
      private _shuriken: Shuriken;

      public constructor(katana: Katana, shuriken: Shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
      }

      public fight() {
        return this._katana.hit();
      }
      public sneak() {
        return this._shuriken.throw();
      }
    }

    const container = new Container();
    container.bind<Cut>(Cut).to(Cut);
    container.bind<Ninja>(Ninja).to(Ninja);
    container.bind<Katana>(Katana).to(Katana);
    container.bind<Shuriken>(Shuriken).to(Shuriken);

    const ninja = container.get<Ninja>(Ninja);

    expect(ninja.fight()).toEqual("cut!");
    expect(ninja.sneak()).toEqual("hit!");
  },
});
