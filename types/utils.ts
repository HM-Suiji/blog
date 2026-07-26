export type Dtoify<T> = T extends Date
  ? string
  : T extends readonly (infer U)[]
    ? Dtoify<U>[]
    : T extends object
      ? {
          [K in keyof T]: Dtoify<Exclude<T[K], null>>
        }
      : Exclude<T, null>
