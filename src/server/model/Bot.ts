import Matter from 'matter-js'
import Character from './Character'
import { getRadiansInput as getRadiansControls } from '../lib/radians'
import Controls, { STILL } from '../../shared/controls'

export default class Bot extends Character {
  constructor ({ x = 0, y = 0, radius = 15, angle = 0, color = 'green' }: {
    x: number
    y: number
    angle?: number
    color?: string
    radius?: number
  }) {
    super({ x, y, angle, color, radius })
  }

  takeInput (controls: Partial<Controls>): void {
    this.controls = { ...this.controls, ...controls }
  }

  choose (): Partial<Controls> {
    if (Character.it === this) {
      const closest: { distance: number, enemy?: Character } = { distance: Infinity }
      for (const [, character] of Character.characters) {
        if (character !== this) {
          const distance = Matter.Vector.sub(character.compound.position, this.compound.position)
          const magnitude = Matter.Vector.magnitude(distance)

          if (magnitude < closest.distance) {
            closest.enemy = character
            closest.distance = magnitude
          }
        }
      }

      if (closest.enemy != null) {
        const radians = Matter.Vector.angle(this.compound.position, closest.enemy.compound.position)
        const controls = getRadiansControls(radians)

        return controls
      }
    }

    return STILL
  }

  act (): void {
    const choice = this.choose()
    this.takeInput(choice)

    super.act()
  }
}