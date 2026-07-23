export type Dtoify<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends string | null
      ? string
      : T[K]
}
