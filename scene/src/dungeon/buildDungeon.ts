import { Animator, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'

//build starting area
export function buildStartingArea() {
  let entity = engine.addEntity()
  let entity2 = engine.addEntity()

  GltfContainer.create(entity, {
    src: 'models/Dungeon_Start.glb'
  })
  GltfContainer.create(entity2, {
    src: 'models/Dungeon_Start_Door.glb'
  })

  Transform.create(entity, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })
  Transform.create(entity2, {
    parent: entity
  })
  pointerEventsSystem.onPointerDown(
    {
      entity: entity2,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door' }
    },
    function () {
      console.log('Moved player to dungeon')
      movePlayerTo({
        newRelativePosition: Vector3.create(77.28, 48.29, -9.8),
        cameraTarget: Vector3.create(8, 1, 8)
      })
    }
  )
}

export function buildDungeon() {
  let entity = engine.addEntity()
  let entity2 = engine.addEntity()
  let entity3 = engine.addEntity()
  let entity4 = engine.addEntity()

  GltfContainer.create(entity, {
    src: 'models/Dungeon.glb'
  })

  GltfContainer.create(entity2, {
    src: 'models/Dungeon_collider.glb'
  })

  GltfContainer.create(entity3, {
    src: 'models/DungeonProps1.glb'
  })

  GltfContainer.create(entity4, {
    src: 'models/Dungeon_Platforms.glb'
  })

  Transform.create(entity, {
    position: Vector3.create(16, 50, 16),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  Transform.create(entity2, {
    parent: entity
  })

  Transform.create(entity3, {
    parent: entity
  })

  Transform.create(entity4, {
    parent: entity
  })

  Animator.create(entity4, {
    states: [{ clip: 'action', playing: true, loop: true }]
  })
}

export function buildDungeonDoors() {
  const doorModels = [
    'models/Dungeon_Door1.glb',
    'models/Dungeon_Door2.glb',
    'models/Dungeon_Door5.glb',
    'models/Dungeon_Door4.glb',
    'models/Dungeon_Door3.glb'
  ]

  doorModels.forEach((model, index) => {
    if (index === 4) {
      // 0-based index, so 4 refers to the 5th door
      createBossDoorEntity(model, `Dungeon Door ${index + 1}`)
    } else {
      createDoorEntity(model, `Dungeon Door ${index + 1}`)
    }
  })
}

function createDoorEntity(modelSrc: string, hoverText: string) {
  const entity = engine.addEntity()

  GltfContainer.create(entity, {
    src: modelSrc
  })

  Transform.create(entity, {
    position: Vector3.create(16, 50, 16),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  Animator.create(entity, {
    states: [
      { clip: 'open', playing: false, loop: false },
      { clip: 'close', playing: false, loop: false },
      { clip: 'idle', playing: true, loop: false }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: { button: InputAction.IA_POINTER, hoverText: hoverText }
    },
    function () {
      console.log(`Open ${hoverText}`)
      Animator.playSingleAnimation(entity, 'open')
    }
  )
}

function createBossDoorEntity(modelSrc: string, hoverText: string) {
  const entity = engine.addEntity()

  GltfContainer.create(entity, {
    src: modelSrc
  })

  Transform.create(entity, {
    position: Vector3.create(16, 50, 16),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  Animator.create(entity, {
    states: [
      { clip: 'open', playing: false, loop: false },
      { clip: 'close', playing: false, loop: false },
      { clip: 'idle', playing: true, loop: false }
    ]
  })

  // Different behavior for Door 5
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: { button: InputAction.IA_POINTER, hoverText: hoverText }
    },
    function () {
      console.log(`Special action for ${hoverText}`)
      Animator.playSingleAnimation(entity, 'open')
    }
  )
}
