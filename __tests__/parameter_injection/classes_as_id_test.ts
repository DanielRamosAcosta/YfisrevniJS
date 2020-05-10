import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts"
import { Container, injectable } from "../../mod.ts"
import { GreeterEnglish } from "./example_classes/greeter_english.ts"

Deno.test({
  name: "classes as id",
  fn: () => {
    @injectable()
    class ExampleService {
      private greeterEnglish: GreeterEnglish

      public constructor(greeterEnglish: GreeterEnglish) {
        this.greeterEnglish = greeterEnglish
      }

      public executeGreeter() {
        return this.greeterEnglish.greet()
      }
    }

    const myContainer = new Container()
    myContainer.bind<GreeterEnglish>(GreeterEnglish).to(GreeterEnglish)
    myContainer.bind<ExampleService>(ExampleService).toSelf()

    const exampleService = myContainer.get<ExampleService>(ExampleService)

    expect(exampleService.executeGreeter()).toEqual("Hello!")
  },
})
