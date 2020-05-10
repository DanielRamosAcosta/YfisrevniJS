import { PARAMETERS_SYMBOLS_KEY, MEMBERS_SYMBOLS_KEY } from "./constants.ts"

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
  if (!target[PARAMETERS_SYMBOLS_KEY]) {
    target[PARAMETERS_SYMBOLS_KEY] = []
  }

  while (target[PARAMETERS_SYMBOLS_KEY].length < index) {
    target[PARAMETERS_SYMBOLS_KEY].push(null)
  }

  target[PARAMETERS_SYMBOLS_KEY][index] = serviceIdentifier

  return target
}

function injectMemberParameter(serviceIdentifier: symbol, target: any, targetKey: string) {
  throw new Error("Unimplemented member injection")
}
