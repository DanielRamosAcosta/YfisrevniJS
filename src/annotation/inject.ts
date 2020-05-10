import { DESIGN_PARAMTYPES } from "../constants/metadata_keys.ts"
import { serviceIdentifierToSymbol } from "../utils/service_identifier_to_symbol.ts"

export function inject(serviceIdentifier: symbol | string) {
  const serviceSymbolId = serviceIdentifierToSymbol(serviceIdentifier)

  return function (target: any, targetKey?: string, index?: number) {
    if (targetKey != null) {
      return injectMemberParameter(serviceSymbolId, target, targetKey)
    }
    if (index != null) {
      return injectConstructorParameter(serviceSymbolId, target, index)
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
