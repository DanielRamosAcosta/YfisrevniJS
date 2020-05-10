import { interfaces } from "../interfaces/interfaces.ts"

export function serviceIdentifierToSymbol<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>) {
  if (typeof serviceIdentifier === "symbol") {
    return serviceIdentifier
  }
  if (typeof serviceIdentifier === "string") {
    return Symbol.for(serviceIdentifier)
  }
  if (typeof serviceIdentifier === "function") {
    return Symbol.for(serviceIdentifier.name)
  }
  throw new Error(`Unknown service identifier ${serviceIdentifier}`)
}
