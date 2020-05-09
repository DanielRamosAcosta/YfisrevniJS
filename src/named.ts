import { PARAMETERS_SYMBOLS_KEY } from "./constants.ts"

export function named(serviceIdentifier: symbol | string) {
  return function (target: any, targetKey: string, index: number) {
    if (!target[PARAMETERS_SYMBOLS_KEY]) {
      target[PARAMETERS_SYMBOLS_KEY] = []
    }

    while (target[PARAMETERS_SYMBOLS_KEY].length < index) {
      target[PARAMETERS_SYMBOLS_KEY].push(null)
    }

    target[PARAMETERS_SYMBOLS_KEY][index] = serviceIdentifier

    return target
  }
}
