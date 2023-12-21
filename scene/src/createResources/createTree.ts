import { Animator, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { ITEM_TYPES } from '../inventory/playerInventoryMap'
import { player } from '../player'
import { checkWearableInUserData } from '../checkWearableData'
import { handleItemClick } from '../ui'
//import { handleItemClick } from '../ui'
//import { player } from '../player'
//import { refreshtimer, setRefreshTimer } from '../factory'

enum Items {
  tree = 'models/PineTree.glb',
  rock = 'models/mining.glb',
  berryTree = 'models/Berries.glb',
  fishing = 'models/Fishing.glb'
}

export const createTree = async (shapeFile: string, x: number | undefined, y: number, z: number | undefined) => {
  let tree = engine.addEntity()
  let isChopping = false
  GltfContainer.create(tree, {
    src: 'models/resourceModels/pinetree.glb'
  })

  Transform.create(tree, {
    position: Vector3.create(x, y, z),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  Animator.create(tree, {
    states: [
      { clip: 'chop', playing: false, loop: false },
      { clip: 'idle', playing: true, loop: false }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: tree,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Chop Tree' }
    },
    function () {
      console.log(`Tree Chopping`)
      if (isChopping === false) {
        isChopping = true
        Animator.playSingleAnimation(tree, 'chop')
        utils.timers.setTimeout(async function () {
          Animator.playSingleAnimation(tree, 'idle')
          engine.removeEntity(tree)
          isChopping = false

          let gatherAmmount = 5
          let gatherLordAmmount = 50

          const isWearableFound = checkWearableInUserData(
            //HATCHETS
            '0xa5d8a8c3454aa003ad72c3f814e52ad6bea69e57:0'
          )

          if ((await isWearableFound) === true) {
            console.log('wearable found')
            gatherAmmount = 7
          }

          //increase player tree inventory
          player.inventory.incrementItem(ITEM_TYPES.TREE, gatherAmmount)

          // handleItemClick('Wood');
          // handleItemClick('Rock');
          //player.inventory.incrementLordItem(ITEM_TYPES.TREE, gatherLordAmmount)
        }, 18000)

        utils.timers.setTimeout(async function () {
          //check wearable

          Animator.playSingleAnimation(tree, 'idle')
          isChopping = false
          createTree(Items.tree, x, y, z)
        }, 30000)
      }
    }
  )
}

export function createAntromTrees() {
  // Create Tree
  // createTree(Items.tree, )
  createTree(Items.tree, 19.23, 0, -24.4)
  createTree(Items.tree, 18.26, 0, -17.65)
}
