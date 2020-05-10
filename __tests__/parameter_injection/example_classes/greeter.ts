export const GREETER_SYMBOL = Symbol("Greeter")

export const GREETER_TAGS = {
  UnitedKingdom: Symbol("UnitedKingdom"),
  Spain: Symbol("Spain"),
}

export interface Greeter {
  greet(): string
}
