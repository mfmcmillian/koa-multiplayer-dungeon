import { executeTask } from '@dcl/sdk/ecs'

import './polyfill'

import { Client } from 'colyseus.js'
import { buildDungeon, buildDungeonDpors, buildStartingArea } from './dungeon/buildDungeon'

const ENDPOINT = 'ws://localhost:2567'

export function main() {
  executeTask(async () => {
    try {
      const client = new Client(ENDPOINT)
      const room = await client.joinOrCreate<any>('my_room', {})
      console.log(room)
    } catch (e) {
      console.log('Failed to conenct', e)
    }
  })

  buildDungeon()
  buildStartingArea()
  buildDungeonDpors()
}
