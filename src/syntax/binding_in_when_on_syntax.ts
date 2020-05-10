import { interfaces } from "../interfaces/interfaces.ts"
import { BindingOnSyntax } from "./binding_on_syntax.ts"

export class BindingInWhenOnSyntax<T> implements interfaces.BindingInWhenOnSyntax<T> {
  constructor(
    private targetNameMapper: Map<interfaces.ServiceIdentifier<any>, any>,
    private parentNameMapper: Map<interfaces.ServiceIdentifier<any>, any>,
    private symbolIdentifier: symbol,
    private TheClass: interfaces.Newable<T>,
  ) {}

  inSingletonScope(): interfaces.BindingWhenOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#inSingletonScope")
  }
  inTransientScope(): interfaces.BindingWhenOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#inTransientScope")
  }
  inRequestScope(): interfaces.BindingWhenOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#inRequestScope")
  }
  when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#when")
  }
  whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
    if (!(this.targetNameMapper.get(this.symbolIdentifier) instanceof Map)) {
      this.targetNameMapper.set(this.symbolIdentifier, new Map())
    }
    this.targetNameMapper.get(this.symbolIdentifier).set(name, this.TheClass)
    return new BindingOnSyntax()
  }
  whenTargetIsDefault(): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenTargetIsDefault")
  }
  whenTargetTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenTargetTagged")
  }
  whenInjectedInto(parent: Function | string): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenInjectedInto")
  }
  whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
    if (!(this.parentNameMapper.get(this.symbolIdentifier) instanceof Map)) {
      this.parentNameMapper.set(this.symbolIdentifier, new Map())
    }
    this.parentNameMapper.get(this.symbolIdentifier).set(name, this.TheClass)
    return new BindingOnSyntax()
  }
  whenParentTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenParentTagged")
  }
  whenAnyAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenAnyAncestorIs")
  }
  whenNoAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenNoAncestorIs")
  }
  whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenAnyAncestorNamed")
  }
  whenAnyAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenAnyAncestorTagged")
  }
  whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenNoAncestorNamed")
  }
  whenNoAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenNoAncestorTagged")
  }
  whenAnyAncestorMatches(
    constraint: (request: interfaces.Request) => boolean,
  ): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenAnyAncestorMatches")
  }
  whenNoAncestorMatches(
    constraint: (request: interfaces.Request) => boolean,
  ): interfaces.BindingOnSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#whenNoAncestorMatches")
  }
  onActivation(
    fn: (context: interfaces.Context, injectable: T) => T,
  ): interfaces.BindingWhenSyntax<T> {
    throw new Error("Unimplemented BindingInWhenOnSyntax#onActivation")
  }
}
