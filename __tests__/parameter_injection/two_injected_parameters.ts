import { Container, injectable, inject } from "../../src/yfisrevni.ts"
import { expect } from "../expect.ts"
import { Greeter, GREETER_SYMBOL } from "./example_classes/greeter.ts"
import { Flyable, FLYABLE_SYMBOL } from "./example_classes/flyable.ts"
import { GreeterEnglish } from "./example_classes/greeter_english.ts"
import { FlyablePlane } from "./example_classes/flyable_plane.ts"

Deno.test("two parameters injection", () => {
  const EXAMPLE_SERVICE_SYMBOL = Symbol.for("ExampleService")

  @injectable()
  class ExampleService {
    private greeter: Greeter
    private flyable: Flyable

    public constructor(
      @inject(GREETER_SYMBOL) greeter: Greeter,
      @inject(FLYABLE_SYMBOL) flyable: Flyable,
    ) {
      this.greeter = greeter
      this.flyable = flyable
    }

    public executeGreeter() {
      return this.greeter.greet()
    }

    public executeFlyable() {
      return this.flyable.fly()
    }
  }

  const myContainer = new Container()
  myContainer.bind<Greeter>(GREETER_SYMBOL).to(GreeterEnglish)
  myContainer.bind<Flyable>(FLYABLE_SYMBOL).to(FlyablePlane)
  myContainer.bind<ExampleService>(EXAMPLE_SERVICE_SYMBOL).to(ExampleService)

  const exampleService = myContainer.get<ExampleService>(EXAMPLE_SERVICE_SYMBOL)

  expect(exampleService.executeGreeter()).toEqual("Hello!")
  expect(exampleService.executeFlyable()).toEqual("The sky is the limit!")
})
