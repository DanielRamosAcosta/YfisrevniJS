import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts"
import { Container, injectable, inject, named } from "../../mod.ts"
import { Greeter, GREETER_SYMBOL, GREETER_TAGS } from "./example_classes/greeter.ts"
import { GreeterEnglish } from "./example_classes/greeter_english.ts"
import { GreeterSpanish } from "./example_classes/greeter_spanish.ts"

Deno.test("two named parameters injection", () => {
  const EXAMPLE_SERVICE_SYMBOL = Symbol.for("ExampleService")

  @injectable()
  class ExampleService {
    private greeterUnitedKingdom: Greeter
    private greeterSpain: Greeter

    public constructor(
      @inject(GREETER_SYMBOL) @named(GREETER_TAGS.UnitedKingdom) greeterUnitedKingdom: Greeter,
      @inject(GREETER_SYMBOL) @named(GREETER_TAGS.Spain) greeterSpain: Greeter,
    ) {
      this.greeterUnitedKingdom = greeterUnitedKingdom
      this.greeterSpain = greeterSpain
    }

    public executeGreeterUnitedKingdom() {
      return this.greeterUnitedKingdom.greet()
    }

    public executeGreeterSpain() {
      return this.greeterSpain.greet()
    }
  }

  const myContainer = new Container()
  myContainer
    .bind<Greeter>(GREETER_SYMBOL)
    .to(GreeterEnglish)
    .whenTargetNamed(GREETER_TAGS.UnitedKingdom)
  myContainer.bind<Greeter>(GREETER_SYMBOL).to(GreeterSpanish).whenTargetNamed(GREETER_TAGS.Spain)
  myContainer.bind<ExampleService>(EXAMPLE_SERVICE_SYMBOL).to(ExampleService)

  const exampleService = myContainer.get<ExampleService>(EXAMPLE_SERVICE_SYMBOL)

  expect(exampleService.executeGreeterUnitedKingdom()).toEqual("Hello!")
  expect(exampleService.executeGreeterSpain()).toEqual("Hola!")
})
