export const GREETER_SYMBOL = Symbol("Greeter")

export const GREETER_TAGS = {
  USA: Symbol("USA"),
  Spain: Symbol("Spain"),
}

export interface Greeter {
  greet(): string
}
