export const FLYABLE_SYMBOL = Symbol("Flyable");

export interface Flyable {
  fly(): string;
}
