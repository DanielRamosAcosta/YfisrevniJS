import { interfaces } from "../interfaces/interfaces.ts"

export class BindingOnSyntax<T> implements interfaces.BindingOnSyntax<T> {
  onActivation(
    fn: (context: interfaces.Context, injectable: T) => T,
  ): interfaces.BindingWhenSyntax<T> {
    throw new Error("Unimplemented BindingOnSyntax#onActivation")
  }
}
