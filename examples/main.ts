import {
  injectable,
  inject,
  Container,
} from "https://raw.githubusercontent.com/DanielRamosAcosta/YfisrevniJS/master/src/yfisrevni.ts"

const GREETER_SYMBOL = Symbol("Greeter")

interface Greeter {
  greet(): string
}

@injectable()
class GreeterEnglish implements Greeter {
  public greet() {
    return "Hello!"
  }
}

const EXAMPLE_SERVICE_SYMBOL = Symbol("ExampleService")

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

console.log(exampleService.executeGreeter()) // Hello!
