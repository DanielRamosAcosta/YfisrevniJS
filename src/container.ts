import { PARAMETERS_SYMBOLS_KEY, PARAMETERS_NAMES_SYMBOLS_KEY } from "./constants.ts"

type ClassOf<T> = new (...args: any[]) => T

export class Container {
  private mapper = new Map<symbol, any>()
  private targetNameMapper = new Map<symbol, any>()
  private parentNameMapper = new Map<symbol, any>()

  bind<T>(serviceIdentifier: symbol) {
    return {
      to: (TheClass: ClassOf<T>) => {
        if (!this.mapper.get(serviceIdentifier)) {
          this.mapper.set(serviceIdentifier, TheClass)
        }

        return {
          whenTargetNamed: (name: symbol | string) => {
            if (!(this.targetNameMapper.get(serviceIdentifier) instanceof Map)) {
              this.targetNameMapper.set(serviceIdentifier, new Map())
            }
            this.targetNameMapper.get(serviceIdentifier).set(name, TheClass)
          },
          whenParentNamed: (name: string) => {
            if (!(this.parentNameMapper.get(serviceIdentifier) instanceof Map)) {
              this.parentNameMapper.set(serviceIdentifier, new Map())
            }
            this.parentNameMapper.get(serviceIdentifier).set(name, TheClass)
          },
        }
      },
    }
  }

  get<T>(
    serviceIdentifier: symbol,
    {
      name = null,
      parentName: parentTag = null,
    }: { name?: symbol | null; parentName?: symbol | null } = {},
  ): T {
    let TargetClass = this.mapper.get(serviceIdentifier)

    if (name) {
      TargetClass = this.targetNameMapper.get(serviceIdentifier).get(name)
    }

    if (parentTag) {
      TargetClass = this.parentNameMapper.get(serviceIdentifier).get(parentTag)
    }

    const dependencies = TargetClass[PARAMETERS_SYMBOLS_KEY] as symbol[]
    const names = TargetClass[PARAMETERS_NAMES_SYMBOLS_KEY] as symbol[] | undefined

    if (!dependencies) {
      return new TargetClass()
    }

    const instances: any[] = []

    dependencies.forEach((parameterKey, index) => {
      instances.push(
        this.get(parameterKey, {
          name: names ? names[index] : null,
          parentName: name,
        }),
      )
    })

    return new TargetClass(...instances)
  }
}
