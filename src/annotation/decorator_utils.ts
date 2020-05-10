export const decorate = (fn: Function, target: any, index?: number) => {
  fn(target, undefined, index)
}
