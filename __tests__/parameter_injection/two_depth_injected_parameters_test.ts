import { expect } from "https://raw.githubusercontent.com/allain/expect/master/mod.ts";
import { Container, injectable, inject } from "../../mod.ts";
import { GREETER_SYMBOL, Greeter } from "./example_classes/greeter.ts";
import { GreeterEnglish } from "./example_classes/greeter_english.ts";
import { Namer, NAMER_SYMBOL } from "./example_classes/namer.ts";

Deno.test({
  name: "two depth parameter injection",
  fn: () => {
    const EXAMPLE_SERVICE_SYMBOL = Symbol.for("ExampleService");

    @injectable()
    class ExampleService {
      private namer: Namer;

      public constructor(@inject(NAMER_SYMBOL) namer: Namer) {
        this.namer = namer;
      }

      public executeGreeter() {
        return this.namer.greetWith("Peter");
      }
    }

    const myContainer = new Container();
    myContainer.bind<Greeter>(GREETER_SYMBOL).to(GreeterEnglish);
    myContainer.bind<Namer>(NAMER_SYMBOL).to(Namer);
    myContainer.bind<ExampleService>(EXAMPLE_SERVICE_SYMBOL).to(ExampleService);

    const exampleService = myContainer.get<ExampleService>(
      EXAMPLE_SERVICE_SYMBOL,
    );

    expect(exampleService.executeGreeter()).toEqual("Peter Hello!");
  },
});
