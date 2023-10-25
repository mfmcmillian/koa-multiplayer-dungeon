import { executeTask } from '@dcl/sdk/ecs'

import './polyfill'

import { Client } from 'colyseus.js'
import { buildDungeon, buildDungeonDoors, buildStartingDungeonArea } from './dungeon/buildDungeon'
import { buildAntrom } from './antrom/buildAntrom'
import { createAntromTrees } from './createResources/createTree'
import { createAntromRocks } from './createResources/createRock'
import { createAntromBerries } from './createResources/createBerries'
import { getUserData } from '~system/UserIdentity'

const ENDPOINT = 'ws://localhost:2567'

export function main() {
  // executeTask(async () => {
  //   try {
  //     const client = new Client(ENDPOINT)
  //     const room = await client.joinOrCreate<any>('my_room', {})
  //     console.log(room)
  //   } catch (e) {
  //     console.log('Failed to conenct', e)
  //   }
  // })
  // Building Dungeon Scene
  // buildDungeon()
  // buildStartingDungeonArea()
  // buildDungeonDoors()
  buildAntrom()
  createAntromTrees()
  // createAntromRocks()
  // createAntromBerries()

  executeTask(async () => {
    let userData = await getUserData({})
    console.log(`MATTTTT: ${userData.data?.userId}`)
  })
}
