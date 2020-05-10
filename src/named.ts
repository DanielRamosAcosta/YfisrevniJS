import { PARAMETERS_NAMES_SYMBOLS_KEY } from "./constants.ts"

export function named(serviceIdentifier: symbol | string) {
  return function (target: any, targetKey?: string, index?: number) {
    if (index != null) {
      return namedConstructorParameter(serviceIdentifier, target, index)
    }
    if (targetKey != null) {
      return namedMemberParameter(serviceIdentifier, target, targetKey)
    }

    throw new Error("Unimplemented use case")
  }
}

function namedConstructorParameter(serviceIdentifier: symbol | string, target: any, index: number) {
  if (!target[PARAMETERS_NAMES_SYMBOLS_KEY]) {
    target[PARAMETERS_NAMES_SYMBOLS_KEY] = []
  }

  while (target[PARAMETERS_NAMES_SYMBOLS_KEY].length < index) {
    target[PARAMETERS_NAMES_SYMBOLS_KEY].push(null)
  }

  target[PARAMETERS_NAMES_SYMBOLS_KEY][index] = serviceIdentifier

  return target
}

function namedMemberParameter(serviceIdentifier: symbol | string, target: any, targetKey: string) {
  throw new Error("Unimplemented named member injection")
}
