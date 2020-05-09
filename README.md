# YfisrevniJS

[![][ghw badge]][ghw link]
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/src/yfisrevni.ts)

Naive inversion of control container for Deno based on [InversifyJS](https://github.com/inversify/InversifyJS)

## Usage

```
import { injectable, inject, Container } from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/src/yfisrevni.ts"
```

> :warning: **Important!** YfisrevniJS requires the `experimentalDecorators` and `emitDecoratorMetadata` compilation options in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "ESNext",
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## The Basics

Let’s take a look at the basic usage and APIs of InversifyJS with TypeScript:

### Step 1: Declare your interfaces and types

Our goal is to write code that adheres to the [dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle).
This means that we should "depend upon Abstractions and do not depend upon concretions".
Let's start by declaring some interfaces (abstractions).

```ts
// file interfaces.ts

export interface Warrior {
  fight(): string
  sneak(): string
}

export interface Weapon {
  hit(): string
}

export interface ThrowableWeapon {
  throw(): string
}
```

InversifyJS need to use the type as identifiers at runtime. We use symbols as identifiers but you can also use classes and or string literals.

```ts
// file types.ts

const TYPES = {
  Warrior: Symbol.for("Warrior"),
  Weapon: Symbol.for("Weapon"),
  ThrowableWeapon: Symbol.for("ThrowableWeapon"),
}

export { TYPES }
```

> **Note**: It is recommended to use Symbols but InversifyJS also support the usage of Classes and string literals (please refer to the features section to learn more).

### Step 2: Declare dependencies using the `@injectable` & `@inject` decorators

Let's continue by declaring some classes (concretions). The classes are implementations of the interfaces that we just declared. All the classes must be annotated with the `@injectable` decorator.

When a class has a dependency on an interface we also need to use the `@inject` decorator to define an identifier for the interface that will be available at runtime. In this case we will use the Symbols `Symbol.for("Weapon")` and `Symbol.for("ThrowableWeapon")` as runtime identifiers.

```ts
// file entities.ts

import { injectable, inject } from "inversify"
import "reflect-metadata"
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces"
import { TYPES } from "./types"

@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!"
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!"
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon
  private _shuriken: ThrowableWeapon

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
  ) {
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

export { Ninja, Katana, Shuriken }
```

If you prefer it you can use property injection instead of constructor injection so you don't have to declare the class constructor:

```ts
@injectable()
class Ninja implements Warrior {
  @inject(TYPES.Weapon) private _katana: Weapon
  @inject(TYPES.ThrowableWeapon) private _shuriken: ThrowableWeapon
  public fight() {
    return this._katana.hit()
  }
  public sneak() {
    return this._shuriken.throw()
  }
}
```

### Step 3: Create and configure a Container

We recommend to do this in a file named `inversify.config.ts`. This is the only place in which there is some coupling.
In the rest of your application your classes should be free of references to other classes.

```ts
// file inversify.config.ts

import { Container } from "inversify"
import { TYPES } from "./types"
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces"
import { Ninja, Katana, Shuriken } from "./entities"

const myContainer = new Container()
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja)
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana)
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken)

export { myContainer }
```

### Step 4: Resolve dependencies

You can use the method `get<T>` from the `Container` class to resolve a dependency.
Remember that you should do this only in your [composition root](http://blog.ploeh.dk/2011/07/28/CompositionRoot/)
to avoid the [service locator anti-pattern](http://blog.ploeh.dk/2010/02/03/ServiceLocatorisanAnti-Pattern/).

```ts
import { myContainer } from "./inversify.config"
import { TYPES } from "./types"
import { Warrior } from "./interfaces"

const ninja = myContainer.get<Warrior>(TYPES.Warrior)

expect(ninja.fight()).eql("cut!") // true
expect(ninja.sneak()).eql("hit!") // true
```

As we can see the `Katana` and `Shuriken` were successfully resolved and injected into `Ninja`.

InversifyJS supports ES5 and ES6 and can work without TypeScript.
Head to the [**JavaScript example**](https://github.com/inversify/InversifyJS/blob/master/wiki/basic_js_example.md) to learn more!

[ghw badge]: https://img.shields.io/github/workflow/status/DanielRamosAcosta/YfisrevniJS/ci
[ghw link]: https://github.com/DanielRamosAcosta/YfisrevniJS/actions?query=workflow%3Aci
