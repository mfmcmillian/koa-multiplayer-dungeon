// import { setTimeout } from "@dcl/ecs-scene-utils"
// import { getUserData } from "@decentraland/Identity"
// import DailyQuestHUD from "./hud/dailyQuest"
// import { ITEM_TYPES } from "./inventory/playerInventoryMap"
// import { INVENTORY_ACTION_REASONS } from "./inventory/reducer"
// import { LEVEL_TYPES } from "./LevelManager/types"
// import { refreshtimer, setRefreshTimer } from "./refreshTimer"
// import {
//     showGetBonusIronIcon,
//     showGetBonusWoodIcon,
//     showGetIronIcon,
//     showGetWoodIcon,
// } from "./ui"
// import getRandomInt from "./utils/getRandomInt"
// import * as ui from "@dcl/ui-scene-utils"
// import getRandomIntRange from "./utils/randomIntRange"
// import {player} from "./player";

// enum Items {
//     tree = "models/Pine.glb",
//     rock = "models/mining.glb",
//     berryTree = "models/Berries.glb",
//     fishing = "models/Fishing.glb",
// }
// //****************************************** */
// //            Create Rock!!
// //****************************************** */
// export const createRock = async (shapeFile: string, x, y, z) => {
//     let rock = new Entity()
//     let rockShape = new GLTFShape(shapeFile)
//     let y2 = y - 1
//     rock.addComponent(
//         new Transform({
//             position: new Vector3(x, y2, z),
//             rotation: new Quaternion(
//                 0,
//                 getRandomInt(10) / 10 + getRandomInt(4),
//                 0,
//                 1
//             ),
//             scale: new Vector3(1, 1, 1),
//         })
//     )

//     const userData = await getUserData()

//     // log("metadroid gun: ", userData.avatar.wearables)
//     let result1 = false
//     //@ts-ignore
//     for (const wearable of userData.avatar.wearables) {
//         if (
//             wearable ===
//             "urn:decentraland:matic:collections-v2:0x874f0520102f4980c23dec3ea7c309a4031a6286:0"
//         ) {
//             result1 = true
//         }
//     }

//     // log("metadroid: ", userData.avatar.wearables)
//     let result2 = false
//     //@ts-ignore
//     for (const wearable of userData.avatar.wearables) {
//         if (
//             wearable ===
//             "urn:decentraland:matic:collections-v2:0xb2bebd43a93e4b9cddb2d2e47202f335029d8d32:0"
//         ) {
//             result2 = true
//         }
//     }

//     let result3 = false
//     //@ts-ignore
//     for (const wearable of userData.avatar.wearables) {
//         if (
//             wearable ===
//             "urn:decentraland:matic:collections-v2:0xf0b49e0f1b6ac8d06808d9e7c5b5ef91700b1f7d:0"
//         ) {
//             result3 = true
//         }
//     }

//     //tree sounds
//     const clip = new AudioClip("sounds/rock.mp3")
//     const rocksound = new AudioSource(clip)
//     // Add AudioSource component to entity
//     rock.addComponent(rocksound)

//     //battle function
//     function battle() {
//         rock.addComponent(
//             new OnPointerDown(
//                 (e) => {
//                     if (refreshtimer <= 0 && !player.isMining) {
//                         player.isMining = true
//                         setRefreshTimer(1.5)
//                         callDyingAnimation()
//                         setTimeout(9 * 1000, () => {
//                             isDeadOnce()
//                             player.isMining = false
//                         })
//                     }
//                 },
//                 {
//                     hoverText: "Mine rock!",
//                     distance: 7,
//                 }
//             )
//         )
//     }
//     rock.addComponent(rockShape)
//     let gnarkAnimator = new Animator()
//     rock.addComponent(gnarkAnimator)

//     //call functions once only
//     let isDead = false
//     engine.removeEntity(rock)

//     function killChar() {
//         setTimeout(9 * 100000, () => {
//             //engine.removeEntity(rock)
//             createRock(shapeFile, x, y, z)
//         })
//         isDead = true
//     }
//     function isDeadOnce() {
//         if (!isDead) killChar()
//     }

//     let isDeadAnimation = false

//     async function dyingAnimation() {
//         mineClip.play()
//         rocksound.playOnce()

//         if (result1 === true) {
//             //ui.displayAnnouncement("+1 ROCK", 1, Color4.Red(), 50);
//             player.inventory.incrementItem(
//                 ITEM_TYPES.ROCK,
//                 6 + 1,
//                 INVENTORY_ACTION_REASONS.MINED_RESOURCE
//             )
//             DailyQuestHUD.getInstance().listenAndUpdateForAnyActiveQuest(
//                 ITEM_TYPES.ROCK,
//                 6 + 1
//             )
//             showGetBonusIronIcon()
//         } else {
//             player.inventory.incrementItem(
//                 ITEM_TYPES.ROCK,
//                 5,
//                 INVENTORY_ACTION_REASONS.MINED_RESOURCE
//             )
//             DailyQuestHUD.getInstance().listenAndUpdateForAnyActiveQuest(
//                 ITEM_TYPES.ROCK,
//                 5
//             )
//             showGetIronIcon()
//         }

//         if (result2 === true) {
//             //ui.displayAnnouncement("+1 ROCK", 1, Color4.Red(), 50);
//             player.inventory.incrementItem(
//                 ITEM_TYPES.ROCK,
//                 6 + 1,
//                 INVENTORY_ACTION_REASONS.MINED_RESOURCE
//             )
//             DailyQuestHUD.getInstance().listenAndUpdateForAnyActiveQuest(
//                 ITEM_TYPES.ROCK,
//                 6 + 1
//             )
//             showGetBonusIronIcon()
//         }

//         if (result3 === true) {
//             //ui.displayAnnouncement("+2 ROCK", 1, Color4.Red(), 50)
//             player.inventory.incrementItem(
//                 ITEM_TYPES.ROCK,
//                 6 + 1,
//                 INVENTORY_ACTION_REASONS.MINED_RESOURCE
//             )
//             DailyQuestHUD.getInstance().listenAndUpdateForAnyActiveQuest(
//                 ITEM_TYPES.ROCK,
//                 6 + 1
//             )
//             showGetBonusIronIcon()
//         }

//         if (result1 === true && result2 === true) {
//             ui.displayAnnouncement("+2 ROCK", 1, Color4.Red(), 50)
//         } else if (result1 === true || result2 === true) {
//             ui.displayAnnouncement("+1 ROCK", 1, Color4.Red(), 50)
//         }

//         if (getRandomInt(5) === 1) {
//             player.inventory.incrementItem(
//                 ITEM_TYPES.CRYSTAL,
//                 1,
//                 INVENTORY_ACTION_REASONS.MINED_RESOURCE
//             )
//         }

//         isDeadAnimation = true
//         player.levels.addXp(LEVEL_TYPES.ROCK, 5)
//         // applyAttackedEnemyEffectToLocation(
//         //     Camera.instance.feetPosition,
//         //     7000
//         // )

//         player.writeDataToServer()
//     }
//     function callDyingAnimation() {
//         if (!isDeadAnimation) dyingAnimation()
//     }

//     // Add rock to engine
//     engine.addEntity(rock)

//     // Add rock animations
//     const mineClip = new AnimationState("mine", { looping: false })
//     gnarkAnimator.addClip(mineClip)
//     const idleClip = new AnimationState("idle")
//     gnarkAnimator.addClip(idleClip)

//     //Default Animation
//     idleClip.play()

//     //rock battle
//     battle()
//     return rock
// }
import { Animator, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

enum Items {
  rock = 'models/resourceModels/mining.glb'
}

// Define a function to create a rock entity with interactivity for mining
export const createRock = async (shapeFile: string, x: number | undefined, y: number, z: number | undefined) => {
  // Create an empty entity for the rock
  let rock = engine.addEntity()
  let isMining = false

  // Attach a 3D model (gltf) to the rock entity
  GltfContainer.create(rock, {
    src: 'models/resourceModels/mining.glb'
  })

  // Set the position, rotation, and scale of the rock entity
  Transform.create(rock, {
    position: Vector3.create(x, y, z),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  // Create an animator component for the rock to manage animations
  Animator.create(rock, {
    states: [
      { clip: 'mine', playing: false, loop: false },
      { clip: 'idle', playing: true, loop: false }
    ]
  })

  // Add a pointer event listener for when the rock is clicked for mining
  pointerEventsSystem.onPointerDown(
    {
      entity: rock,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Mine Rock' }
    },
    function () {
      console.log(`Mining Rock`)
      if (isMining === false) {
        isMining = true
        // Play the 'mine' animation
        Animator.playSingleAnimation(rock, 'mine')
        // Schedule a timer to reset the rock after 18 seconds (adjust time as needed)
        utils.timers.setTimeout(function () {
          Animator.playSingleAnimation(rock, 'idle')
          engine.removeEntity(rock)
          isMining = false
        }, 18000) // Adjust the time as needed
        // Schedule a timer to create a new rock after a specific duration (adjust time as needed)
        utils.timers.setTimeout(function () {
          Animator.playSingleAnimation(rock, 'idle')
          isMining = false
          createRock(Items.rock, x, y, z)
        }, 30000) // Adjust the time as needed
      }
    }
  )
}

export function createAntromRocks() {
  // Create Tree
  // createTree(Items.tree, )
  createRock(Items.rock, 13.16, 0, -19.55)
  createRock(Items.rock, 18.26, 0, -17.65)
}
