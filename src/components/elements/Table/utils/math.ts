export const round = (num: number) => {
  return {
    to: (precision: number) => Math.round(num / precision) * precision,
  }
}

export const value = (v: number) => {
  return {
    isBetween: (min: number, max: number) => v >= min && v <= max,
    max: (max: number) => v > max ? max : v,
  }
}