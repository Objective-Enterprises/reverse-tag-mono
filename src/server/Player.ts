import Character from './Character'
import Stage from './Stage'

export default class Player extends Character {
  static players = new Map<string, Player>()

  readonly id: string
  constructor ({
    id,
    observer = false,
    radius = 15,
    stage,
    x = 0,
    y = 0
  }: {
    id: string
    observer?: boolean
    radius?: number
    stage: Stage
    x: number
    y: number
  }) {
    super({ x, y, radius, stage })
    this.observer = observer
    if (this.observer) {
      this.ready = false
    }
    this.id = id
    Player.players.set(this.id, this)
  }

  act (): void {
    // this.debugPath()
    super.act()
    if (this.stage.debugOpenWaypoints) {
      const visible = this.stage.waypoints.filter(waypoint => {
        return this.isPointWallOpen({ point: waypoint.position })
      })
      visible.forEach(waypoint => {
        this.stage.line({
          color: 'black',
          end: waypoint.position,
          start: this.feature.body.position
        })
      })
    }
    if (this.stage.debugPosition) {
      console.log('player position', this.feature.body.position)
    }
    if (this.stage.debugSpeed) {
      console.log('player speed', this.feature.body.speed)
    }
  }

  destroy (): void {
    console.log('destroying player', this.id)
  }
}
