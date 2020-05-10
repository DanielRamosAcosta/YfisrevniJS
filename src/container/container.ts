import { interfaces } from "../interfaces/interfaces.ts"
import { PARAMETERS_NAMES_SYMBOLS_KEY, DESIGN_PARAMTYPES } from "../constants/metadata_keys.ts"
import { BindingInWhenOnSyntax } from "../syntax/binding_in_when_on_syntax.ts"
import { serviceIdentifierToSymbol } from "../utils/service_identifier_to_symbol.ts"

export class Container implements interfaces.Container {
  public id: number = 0
  public parent: Container | null = null
  public options: interfaces.ContainerOptions = {}

  private mapper = new Map<interfaces.ServiceIdentifier<any>, any>()
  private targetNameMapper = new Map<interfaces.ServiceIdentifier<any>, any>()
  private parentNameMapper = new Map<interfaces.ServiceIdentifier<any>, any>()

  bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
    const serviceSymbolId = serviceIdentifierToSymbol(serviceIdentifier)

    // @ts-ignore
    const newLocal: interfaces.BindingToSyntax<T> = {
      to: (TheClass: interfaces.Newable<T>): interfaces.BindingInWhenOnSyntax<T> => {
        if (!this.mapper.get(serviceSymbolId)) {
          this.mapper.set(serviceSymbolId, TheClass)
        }

        return new BindingInWhenOnSyntax<T>(
          this.targetNameMapper,
          this.parentNameMapper,
          serviceSymbolId,
          TheClass,
        )
      },
      toSelf: (): interfaces.BindingInWhenOnSyntax<T> => {
        if (!this.mapper.get(serviceSymbolId)) {
          this.mapper.set(serviceSymbolId, serviceIdentifier)
        }
        return new BindingInWhenOnSyntax<T>(
          this.targetNameMapper,
          this.parentNameMapper,
          serviceSymbolId,
          serviceIdentifier as interfaces.Newable<T>,
        )
      },
    }
    return newLocal
  }

  rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
    throw new Error("Unimplemented method rebind")
  }

  unbind(serviceIdentifier: interfaces.ServiceIdentifier<any>): void {
    throw new Error("Unimplemented method unbind")
  }

  unbindAll(): void {
    throw new Error("Unimplemented method unbindAll")
  }

  isBound(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean {
    throw new Error("Unimplemented method isBound")
  }

  isBoundNamed(
    serviceIdentifier: interfaces.ServiceIdentifier<any>,
    named: string | number | symbol,
  ): boolean {
    throw new Error("Unimplemented method isBoundNamed")
  }

  isBoundTagged(
    serviceIdentifier: interfaces.ServiceIdentifier<any>,
    key: string | number | symbol,
    value: any,
  ): boolean {
    throw new Error("Unimplemented method isBoundTagged")
  }

  get<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    {
      name = null,
      parentName: parentTag = null,
    }: { name?: symbol | null; parentName?: symbol | null } = {},
  ): T {
    const serviceSymbolId = serviceIdentifierToSymbol(serviceIdentifier)

    let TargetClass = this.mapper.get(serviceSymbolId)

    if (name) {
      TargetClass = this.targetNameMapper.get(serviceSymbolId).get(name)
    }

    if (parentTag) {
      TargetClass = this.parentNameMapper.get(serviceSymbolId).get(parentTag)
    }

    const dependencies = TargetClass[DESIGN_PARAMTYPES] as interfaces.ServiceIdentifier<any>[]
    const names = TargetClass[PARAMETERS_NAMES_SYMBOLS_KEY] as symbol[] | undefined

    if (!dependencies) {
      return new TargetClass()
    }

    const instances: any[] = []

    dependencies.forEach((parameterKey, index) => {
      if (typeof parameterKey === "symbol") {
        instances.push(
          this.get(parameterKey, {
            name: names ? names[index] : null,
            parentName: name,
          }),
        )
        return
      }

      // @ts-ignore
      instances.push(new parameterKey())
    })

    return new TargetClass(...instances)
  }

  getNamed<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    named: string | number | symbol,
  ): T {
    throw new Error("Unimplmented method getNamed")
  }

  getTagged<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    key: string | number | symbol,
    value: any,
  ): T {
    throw new Error("Unimplmented method getTagged")
  }

  getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[] {
    throw new Error("Unimplmented method getAll")
  }

  getAllTagged<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    key: string | number | symbol,
    value: any,
  ): T[] {
    throw new Error("Unimplmented method getAllTagged")
  }

  getAllNamed<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    named: string | number | symbol,
  ): T[] {
    throw new Error("Unimplmented method getAllNamed")
  }

  resolve<T>(constructorFunction: interfaces.Newable<T>): T {
    throw new Error("Unimplmented method resolve")
  }

  load(...modules: interfaces.ContainerModule[]): void {
    throw new Error("Unimplmented method load")
  }

  loadAsync(...modules: interfaces.AsyncContainerModule[]): Promise<void> {
    throw new Error("Unimplmented method loadAsync")
  }

  unload(...modules: interfaces.ContainerModule[]): void {
    throw new Error("Unimplmented method unload")
  }

  applyCustomMetadataReader(metadataReader: interfaces.MetadataReader): void {
    throw new Error("Unimplmented method applyCustomMetadataReader")
  }

  applyMiddleware(...middleware: interfaces.Middleware[]): void {
    throw new Error("Unimplmented method applyMiddleware")
  }

  snapshot(): void {
    throw new Error("Unimplmented method snapshot")
  }

  restore(): void {
    throw new Error("Unimplmented method restore")
  }

  createChild(): Container {
    throw new Error("Unimplmented method createChild")
  }
}
