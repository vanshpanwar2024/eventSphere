declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(array: Float32Array, options?: { radius?: number }): Float32Array;
  export function inBox(array: Float32Array, options?: { sides?: number[] }): Float32Array;
  // add other missing exports that could be needed, since it used `import * as random from ...`
  const random: any;
  export default random;
}
