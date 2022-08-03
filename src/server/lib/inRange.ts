import Matter from 'matter-js'

export default function isInRange ({ start, end, range }: {
  start: number
  end: number
  range: number
}): boolean {
  const difference = end - start
  const absolute = Math.abs(difference)

  return absolute < range
}

export function isPointInRange ({ start, end, xRange, yRange }: {
  start: Matter.Vector
  end: Matter.Vector
  xRange: number
  yRange: number
}): boolean {
  const xInRange = isInRange({ start: start.x, end: end.x, range: xRange })
  const yInRange = isInRange({ start: start.y, end: end.y, range: yRange })

  return xInRange && yInRange
}