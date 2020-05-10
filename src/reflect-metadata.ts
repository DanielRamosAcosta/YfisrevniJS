if (!("metadata" in Reflect)) {
  // @ts-ignore
  Reflect.metadata = (key, values) => {
    return (target: any) => {
      target[Symbol.for(key)] = values
      return target
    }
  }
}
