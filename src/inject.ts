import { DESIGN_PARAMTYPES } from "./constants.ts"

export function inject(serviceIdentifier: symbol) {
  return function (target: any, targetKey?: string, index?: number) {
    if (targetKey != null) {
      return injectMemberParameter(serviceIdentifier, target, targetKey)
    }
    if (index != null) {
      return injectConstructorParameter(serviceIdentifier, target, index)
    }

    throw new Error("Unimplemented use case")
  }
}

function injectConstructorParameter(serviceIdentifier: symbol, target: any, index: number) {
  if (!target[DESIGN_PARAMTYPES]) {
    target[DESIGN_PARAMTYPES] = []
  }

  while (target[DESIGN_PARAMTYPES].length < index) {
    target[DESIGN_PARAMTYPES].push(null)
  }

  target[DESIGN_PARAMTYPES][index] = serviceIdentifier

  return target
}

function injectMemberParameter(serviceIdentifier: symbol, target: any, targetKey: string) {
  throw new Error("Unimplemented member injection")
}
