// import { setTimeout } from "@dcl/ecs-scene-utils"
// import { getUserData } from "@decentraland/Identity"
// import DailyQuestHUD from "./hud/dailyQuest"
// import { ITEM_TYPES } from "./inventory/playerInventoryMap"
// import { INVENTORY_ACTION_REASONS } from "./inventory/reducer"
// import { LEVEL_TYPES } from "./LevelManager/types"
// import { refreshtimer, setRefreshTimer } from "./refreshTimer"
// import { showGetBerryIcon, showGetBonusWoodIcon, showGetWoodIcon } from "./ui"
// import getRandomInt from "./utils/getRandomInt"
// import * as ui from "@dcl/ui-scene-utils"
// import {player} from "./player";

// enum Items {
//     tree = "models/Pine.glb",
//     rock = "models/mining.glb",
//     berryTree = "models/Berries.glb",
//     fishing = "models/Fishing.glb",
// }

// //****************************************** */
// //            Create Berry Tree!!
// //****************************************** */
// export const createberryTree = (shapeFile: string, x, y, z) => {
//     let berrytree = new Entity()
//     let treeShape = new GLTFShape(shapeFile)
//     berrytree.addComponent(
//         new Transform({
//             position: new Vector3(x, y, z),
//             rotation: new Quaternion(
//                 0,
//                 getRandomInt(10) / 10 + getRandomInt(4),
//                 0,
//                 1
//             ),
//             scale: new Vector3(1.5, 1.5, 1.5),
//         })
//     )

//     //tree sounds
//     const clip = new AudioClip("sounds/berryPicking.mp3")
//     const berryPickingSound = new AudioSource(clip)
//     // Add AudioSource component to entity
//     berrytree.addComponent(berryPickingSound)

//     //battle function
//     function battle() {
//         berrytree.addComponent(
//             new OnPointerDown(
//                 (e) => {
//                     if (refreshtimer <= 0 && !player.isShakingTree) {
//                         player.isShakingTree = true
//                         setRefreshTimer(1.5)
//                         callDyingAnimation()

//                         setTimeout(3 * 1000, () => {
//                             isDeadOnce()
//                             player.isShakingTree = false
//                         })
//                     }
//                 },
//                 {
//                     hoverText: "Shake tree!",
//                     distance: 7,
//                 }
//             )
//         )
//     }
//     berrytree.addComponent(treeShape)
//     let gnarkAnimator = new Animator()
//     berrytree.addComponent(gnarkAnimator)

//     //call functions once only
//     let isDead = false

//     function killChar() {
//         engine.removeEntity(berrytree)
//         createberryTree(shapeFile, x, y, z)
//         isDead = true
//     }
//     function isDeadOnce() {
//         if (!isDead) killChar()
//     }

//     let isDeadAnimation = false

//     function dyingAnimation() {
//         shakeClip.play()
//         berryPickingSound.playOnce();
//         const randomInt = getRandomInt(2) + 1
//         player.inventory.incrementItem(
//             ITEM_TYPES.BERRY,
//             randomInt,
//             INVENTORY_ACTION_REASONS.MINED_RESOURCE
//         )
//         DailyQuestHUD.getInstance().listenAndUpdateForAnyActiveQuest(
//             ITEM_TYPES.BERRY,
//             randomInt
//         )
//         showGetBerryIcon()
//         //applyAttackedEnemyEffectToLocation(Camera.instance.feetPosition)
//         player.writeDataToServer()
//         isDeadAnimation = true
//     }
//     function callDyingAnimation() {
//         if (!isDeadAnimation) dyingAnimation()
//     }

//     // Add tree to engine
//     engine.addEntity(berrytree)

//     // Add tree animations
//     const shakeClip = new AnimationState("gather")
//     gnarkAnimator.addClip(shakeClip)
//     const idleClip = new AnimationState("idle")
//     gnarkAnimator.addClip(idleClip)

//     //Default Animation
//     idleClip.play()

//     //monster battle
//     battle()

//     return berrytree
// }
import { Animator, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

enum Items {
  tree = 'models/PineTree.glb',
  rock = 'models/mining.glb',
  berryTree = 'models/Berries.glb',
  fishing = 'models/Fishing.glb'
}

// Define a function to create a berries entity with interactivity for harvesting
export const createBerries = async (shapeFile: string, x: number | undefined, y: number, z: number | undefined) => {
  // Create an empty entity for the berries
  let berries = engine.addEntity()
  let isHarvesting = false

  // Attach a 3D model (gltf) to the berries entity
  GltfContainer.create(berries, {
    src: 'models/resourceModels/berries.glb'
  })

  // Set the position, rotation, and scale of the berries entity
  Transform.create(berries, {
    position: Vector3.create(x, y, z),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  // Create an animator component for the berries to manage animations
  Animator.create(berries, {
    states: [
      { clip: 'gather', playing: false, loop: true },
      { clip: 'idle', playing: true, loop: false }
    ]
  })

  // Add a pointer event listener for when the berries are clicked for harvesting
  pointerEventsSystem.onPointerDown(
    {
      entity: berries,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Harvest Berries' }
    },
    function () {
      console.log(`Harvesting Berries`)
      if (isHarvesting === false) {
        isHarvesting = true
        // Play the 'harvest' animation
        Animator.playSingleAnimation(berries, 'gather')
        // Schedule a timer to reset the berries after a certain duration (adjust time as needed)
        utils.timers.setTimeout(function () {
          Animator.playSingleAnimation(berries, 'idle')
          engine.removeEntity(berries)
          isHarvesting = false
        }, 15000) // Adjust the time as needed
        // Schedule a timer to create a new berries entity after a specific duration (adjust time as needed)
        utils.timers.setTimeout(function () {
          Animator.playSingleAnimation(berries, 'idle')
          isHarvesting = false
          createBerries(Items.berryTree, x, y, z)
        }, 30000) // Adjust the time as needed
      }
    }
  )
}

export function createAntromBerries() {
  // Create Tree
  // createTree(Items.tree, )
  createBerries(Items.berryTree, 22.27, 0, -21.1)
  createBerries(Items.berryTree, 26.42, 0, -17.72)
}
