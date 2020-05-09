import { PARAMETERS_SYMBOLS_KEY } from "./constants.ts"

type ClassOf<T> = new (...args: any[]) => T

export class Container {
  private mapper = new Map<symbol, any>()

  bind<T>(serviceIdentifier: symbol) {
    return {
      to: (TheClass: ClassOf<T>) => {
        this.mapper.set(serviceIdentifier, TheClass)

        return {
          whenTargetNamed(target: string) {},
          whenParentNamed(target: string) {},
        }
      },
    }
  }

  get<T>(serviceIdentifier: symbol): T {
    const TargetClass = this.mapper.get(serviceIdentifier)

    const dependenciesServiceIdentifiers = TargetClass[PARAMETERS_SYMBOLS_KEY] as symbol[]

    if (!dependenciesServiceIdentifiers) {
      return new TargetClass()
    }

    const instances = dependenciesServiceIdentifiers.map((parameterKey) => this.get(parameterKey))

    return new TargetClass(...instances)
  }
}
