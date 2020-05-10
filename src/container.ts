import { PARAMETERS_SYMBOLS_KEY, PARAMETERS_NAMES_SYMBOLS_KEY } from "./constants.ts"

type ClassOf<T> = new (...args: any[]) => T

export class Container {
  private mapper = new Map<symbol, any>()
  private mapperConstraints = new Map<symbol, any>()

  bind<T>(serviceIdentifier: symbol) {
    return {
      to: (TheClass: ClassOf<T>) => {
        this.mapper.set(serviceIdentifier, TheClass)

        return {
          whenTargetNamed: (target: symbol | string) => {
            if (!(this.mapperConstraints.get(serviceIdentifier) instanceof Map)) {
              this.mapperConstraints.set(serviceIdentifier, new Map())
            }

            this.mapperConstraints.get(serviceIdentifier).set(target, TheClass)
          },
          whenParentNamed: (target: string) => {},
        }
      },
    }
  }

  get<T>(serviceIdentifier: symbol, tag: symbol | null = null): T {
    let TargetClass = this.mapper.get(serviceIdentifier)

    if (tag) {
      TargetClass = this.mapperConstraints.get(serviceIdentifier).get(tag)
    }

    const dependencies = TargetClass[PARAMETERS_SYMBOLS_KEY] as symbol[]
    const tags = TargetClass[PARAMETERS_NAMES_SYMBOLS_KEY] as symbol[] | undefined

    if (!dependencies) {
      return new TargetClass()
    }

    const instances: any[] = []

    dependencies.forEach((parameterKey, index) => {
      instances.push(this.get(parameterKey, tags ? tags[index] : null))
    })

    return new TargetClass(...instances)
  }
}
