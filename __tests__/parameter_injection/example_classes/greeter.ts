export const GREETER_SYMBOL = Symbol("Greeter")

export interface Greeter {
  greet(): string
}
