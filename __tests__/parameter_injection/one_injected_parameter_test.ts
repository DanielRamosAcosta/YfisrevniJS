import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts"
import { Container, injectable, inject } from "../../mod.ts"
import { GREETER_SYMBOL, Greeter } from "./example_classes/greeter.ts"
import { GreeterEnglish } from "./example_classes/greeter_english.ts"

Deno.test({
  name: "single parameter injection",
  fn: () => {
    const EXAMPLE_SERVICE_SYMBOL = Symbol.for("ExampleService")

    @injectable()
    class ExampleService {
      private greeter: Greeter

      public constructor(@inject(GREETER_SYMBOL) greeter: Greeter) {
        this.greeter = greeter
      }

      public executeGreeter() {
        return this.greeter.greet()
      }
    }

    const myContainer = new Container()
    myContainer.bind<Greeter>(GREETER_SYMBOL).to(GreeterEnglish)
    myContainer.bind<ExampleService>(EXAMPLE_SERVICE_SYMBOL).to(ExampleService)

    const exampleService = myContainer.get<ExampleService>(EXAMPLE_SERVICE_SYMBOL)

    expect(exampleService.executeGreeter()).toEqual("Hello!")
  },
})
