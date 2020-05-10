// @ts-ignore
Reflect.metadata = (key, values) => {
  return (target: any) => {
    target[Symbol.for(key)] = values
    return target
  }
}
/*
// @ts-ignore
Reflect.decorate = (decorators, target, key, desc) => {
  console.log("[decorate] decorators", decorators)
  console.log("[decorate] target", target)
  console.log("[decorate] key", key)
  console.log("[decorate] desc", desc)
  for (const decorator of decorators) {
    target = decorator(target)
    console.log("[decorate] target modified", target)
  }

  console.log(target[Symbol.for("design:paramtypes")])

  return target
}
*/
