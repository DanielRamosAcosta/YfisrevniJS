import { assertEquals } from "https://deno.land/std/testing/asserts.ts"

export function expect(a: any) {
  return {
    toEqual(b: any) {
      assertEquals(a, b)
    },
  }
}
