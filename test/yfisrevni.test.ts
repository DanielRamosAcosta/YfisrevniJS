import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts";
import "../src/reflect-metadata.ts";
import { Container, injectable, inject, decorate, named } from "../mod.ts";

const withinContext = (context: string) =>
  (name: string) => `[${context}] ${name}`;

const withinPropertyInjection = withinContext("YfisrevniJS");

Deno.test({
  name: withinPropertyInjection(
    "Should be able to resolve and inject dependencies",
  ),
  fn: () => {
    interface Ninja {
      fight(): string;
      sneak(): string;
    }

    interface Katana {
      hit(): string;
    }

    interface Shuriken {
      throw(): string;
    }

    @injectable()
    class Katana implements Katana {
      public hit() {
        return "cut!";
      }
    }

    @injectable()
    class Shuriken implements Shuriken {
      public throw() {
        return "hit!";
      }
    }

    @injectable()
    class Ninja implements Ninja {
      private _katana: Katana;
      private _shuriken: Shuriken;

      public constructor(
        @inject("Katana") katana: Katana,
        @inject("Shuriken") shuriken: Shuriken,
      ) {
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
    container.bind<Ninja>("Ninja").to(Ninja);
    container.bind<Katana>("Katana").to(Katana);
    container.bind<Shuriken>("Shuriken").to(Shuriken);

    const ninja = container.get<Ninja>("Ninja");

    expect(ninja.fight()).toEqual("cut!");
    expect(ninja.sneak()).toEqual("hit!");
  },
});

Deno.test({
  name: withinPropertyInjection(
    "Should be able to resolve and inject dependencies in VanillaJS",
  ),
  fn: () => {
    const TYPES = {
      Katana: "Katana",
      Ninja: "Ninja",
      Shuriken: "Shuriken",
    };

    class Katana {
      public hit() {
        return "cut!";
      }
    }

    class Shuriken {
      public throw() {
        return "hit!";
      }
    }

    class Ninja {
      public _katana: Katana;
      public _shuriken: Shuriken;

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

    decorate(injectable(), Katana);
    decorate(injectable(), Shuriken);
    decorate(injectable(), Ninja);
    decorate(inject(TYPES.Katana), Ninja, 0);
    decorate(inject(TYPES.Shuriken), Ninja, 1);

    const container = new Container();
    container.bind<Ninja>(TYPES.Ninja).to(Ninja);
    container.bind<Katana>(TYPES.Katana).to(Katana);
    container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);

    const ninja = container.get<Ninja>(TYPES.Ninja);

    expect(ninja.fight()).toEqual("cut!");
    expect(ninja.sneak()).toEqual("hit!");
  },
});

Deno.test({
  name: withinPropertyInjection(
    "Should be able to use classes as runtime identifiers",
  ),
  fn: () => {
    @injectable()
    class Katana {
      public hit() {
        return "cut!";
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
    container.bind<Ninja>(Ninja).to(Ninja);
    container.bind<Katana>(Katana).to(Katana);
    container.bind<Shuriken>(Shuriken).to(Shuriken);

    const ninja = container.get<Ninja>(Ninja);

    expect(ninja.fight()).toEqual("cut!");
    expect(ninja.sneak()).toEqual("hit!");
  },
});

Deno.test({
  name: withinPropertyInjection(
    "Should be able to use Symbols as runtime identifiers",
  ),
  fn: () => {
    interface Ninja {
      fight(): string;
      sneak(): string;
    }

    interface Katana {
      hit(): string;
    }

    interface Shuriken {
      throw(): string;
    }

    @injectable()
    class Katana implements Katana {
      public hit() {
        return "cut!";
      }
    }

    @injectable()
    class Shuriken implements Shuriken {
      public throw() {
        return "hit!";
      }
    }

    const TYPES = {
      Katana: Symbol.for("Katana"),
      Ninja: Symbol.for("Ninja"),
      Shuriken: Symbol.for("Shuriken"),
    };

    @injectable()
    class Ninja implements Ninja {
      private _katana: Katana;
      private _shuriken: Shuriken;

      public constructor(
        @inject(TYPES.Katana) katana: Katana,
        @inject(TYPES.Shuriken) shuriken: Shuriken,
      ) {
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
    container.bind<Ninja>(TYPES.Ninja).to(Ninja);
    container.bind<Katana>(TYPES.Katana).to(Katana);
    container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);

    const ninja = container.get<Ninja>(TYPES.Ninja);

    expect(ninja.fight()).toEqual("cut!");
    expect(ninja.sneak()).toEqual("hit!");
  },
});

Deno.test({
  name: "Should be able to wrap Symbols with LazyServiceIdentifer",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support Container modules",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support control over the scope of the dependencies",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of classes to itself",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of constant values",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of dynamic values",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of Functions",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of class constructors",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of user defined factories",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of user defined factories with args",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of user defined factories with partial application",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of auto factories",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of providers",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of multiple values",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of multiple values with nested inject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of multiple values with nested multiInject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of multiple values when using classes as keys",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of multiple values with nested inject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of multiple values with nested multiInject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of multiple values when using Symbols as keys",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support the injection of multiple values with nested inject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support the injection of multiple values with nested multiInject",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support tagged bindings",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support custom tag decorators",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support named bindings",
  ignore: false,
  fn: () => {
    const name: symbol = Symbol.for("Weak");

    interface Weapon {}

    @injectable()
    class Katana implements Weapon {}

    @injectable()
    class Shuriken implements Weapon {}

    interface Warrior {
      katana: Weapon;
      shuriken: Weapon;
    }

    @injectable()
    class Ninja implements Warrior {
      public katana: Weapon;
      public shuriken: Weapon;
      public constructor(
        @inject("Weapon") @named("strong") katana: Weapon,
        @inject("Weapon") @named(name) shuriken: Weapon,
      ) {
        this.katana = katana;
        this.shuriken = shuriken;
      }
    }

    const container = new Container();
    container.bind<Warrior>("Warrior").to(Ninja);
    container.bind<Weapon>("Weapon").to(Katana).whenTargetNamed("strong");
    container.bind<Weapon>("Weapon").to(Shuriken).whenTargetNamed(name);

    const ninja = container.get<Warrior>("Warrior");
    expect(ninja.katana).toBeInstanceOf(Katana);
    expect(ninja.shuriken).toBeInstanceOf(Shuriken);
  },
});

Deno.test({
  name: "Should support contextual bindings and targetName annotation",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should be able to resolve a ambiguous binding by providing a named tag",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should be able to resolve a ambiguous binding by providing a custom tag",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should be able to inject into a super constructor",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should allow to flag arguments as unmanaged",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support a whenInjectedInto contextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should support a whenParentNamed contextual bindings constraint",
  ignore: true,
  fn: () => {
    const TYPES = {
      Material: "Material",
      Ninja: "Ninja",
      Weapon: "Weapon",
    };

    interface Material {
      name: string;
    }

    @injectable()
    class Wood implements Material {
      public name: string;
      public constructor() {
        this.name = "wood";
      }
    }

    @injectable()
    class Iron implements Material {
      public name: string;
      public constructor() {
        this.name = "iron";
      }
    }

    interface Weapon {
      material: Material;
    }

    @injectable()
    class Sword implements Weapon {
      public material: Material;
      public constructor(@inject("Material") material: Material) {
        this.material = material;
      }
    }

    interface Ninja {
      weapon: Weapon;
    }

    @injectable()
    class NinjaStudent implements Ninja {
      public weapon: Weapon;

      public constructor(
        @inject("Weapon") @named("non-lethal") weapon: Weapon,
      ) {
        this.weapon = weapon;
      }
    }

    @injectable()
    class NinjaMaster implements Ninja {
      public weapon: Weapon;

      public constructor(@inject("Weapon") @named("lethal") weapon: Weapon) {
        this.weapon = weapon;
      }
    }

    const container = new Container();
    container.bind<Ninja>(TYPES.Ninja).to(NinjaStudent).whenTargetTagged(
      "master",
      false,
    );
    container.bind<Ninja>(TYPES.Ninja).to(NinjaMaster).whenTargetTagged(
      "master",
      true,
    );
    container.bind<Weapon>(TYPES.Weapon).to(Sword);
    container.bind<Material>(TYPES.Material).to(Iron).whenParentNamed("lethal");
    container.bind<Material>(TYPES.Material).to(Wood).whenParentNamed(
      "non-lethal",
    );

    const master = container.getTagged<Ninja>(TYPES.Ninja, "master", true);
    const student = container.getTagged<Ninja>(TYPES.Ninja, "master", false);

    expect(master.weapon.material.name).toEqual("iron");
    expect(student.weapon.material.name).toEqual("wood");
  },
});

Deno.test({
  name: "Should support a whenParentTagged contextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support a whenAnyAncestorIs and whenNoAncestorIs contextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support a whenAnyAncestorNamed and whenNoAncestorNamed contextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support a whenAnyAncestorTagged and whenNoAncestorTaggedcontextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name:
    "Should support a whenAnyAncestorMatches and whenNoAncestorMatches contextual bindings constraint",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should be able to inject a regular derived class",
  ignore: true,
  fn: () => {},
});

Deno.test({
  name: "Should be able to identify missing @injectable in a base class",
  ignore: true,
  fn: () => {},
});
