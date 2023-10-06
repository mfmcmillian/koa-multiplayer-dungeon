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

  GltfContainer.create(entity, {
    src: 'models/Dungeon.glb'
  })

  GltfContainer.create(entity2, {
    src: 'models/Dungeon_collider.glb'
  })

  Transform.create(entity, {
    position: Vector3.create(16, 50, 16),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  Transform.create(entity2, {
    parent: entity
  })
}

export function buildDungeonDpors() {
  let entity = engine.addEntity()
  let entity2 = engine.addEntity()
  let entity3 = engine.addEntity()
  let entity4 = engine.addEntity()
  let entity5 = engine.addEntity()

  GltfContainer.create(entity, {
    src: 'models/Dungeon_Door1.glb'
  })
  GltfContainer.create(entity2, {
    src: 'models/Dungeon_Door2.glb'
  })
  GltfContainer.create(entity3, {
    src: 'models/Dungeon_Door3.glb'
  })
  GltfContainer.create(entity4, {
    src: 'models/Dungeon_Door4.glb'
  })
  GltfContainer.create(entity5, {
    src: 'models/Dungeon_Door5.glb'
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
  Transform.create(entity5, {
    parent: entity
  })

  Animator.create(entity, {
    states: [
      {
        clip: 'open',
        playing: false,
        loop: false
      },
      {
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        clip: 'idle',
        playing: true,
        loop: false
      }
    ]
  })
  Animator.create(entity2, {
    states: [
      {
        clip: 'open',
        playing: false,
        loop: false
      },
      {
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        clip: 'idle',
        playing: true,
        loop: false
      }
    ]
  })
  Animator.create(entity3, {
    states: [
      {
        clip: 'open',
        playing: false,
        loop: false
      },
      {
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        clip: 'idle',
        playing: true,
        loop: false
      }
    ]
  })
  Animator.create(entity4, {
    states: [
      {
        clip: 'open',
        playing: false,
        loop: false
      },
      {
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        clip: 'idle',
        playing: true,
        loop: false
      }
    ]
  })
  Animator.create(entity5, {
    states: [
      {
        clip: 'open',
        playing: false,
        loop: false
      },
      {
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        clip: 'idle',
        playing: true,
        loop: false
      }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door1' }
    },
    function () {
      console.log('Open dungeon door 1')
      Animator.playSingleAnimation(entity, 'open')
    }
  )

  pointerEventsSystem.onPointerDown(
    {
      entity: entity2,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door2' }
    },
    function () {
      console.log('Open dungeon door 2')
      Animator.playSingleAnimation(entity2, 'open')
    }
  )
  pointerEventsSystem.onPointerDown(
    {
      entity: entity3,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door3' }
    },
    function () {
      console.log('Open dungeon door 3')
      Animator.playSingleAnimation(entity3, 'open')
    }
  )
  pointerEventsSystem.onPointerDown(
    {
      entity: entity4,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door4' }
    },
    function () {
      console.log('Open dungeon door 4')
      Animator.playSingleAnimation(entity4, 'open')
    }
  )
  pointerEventsSystem.onPointerDown(
    {
      entity: entity5,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Dungeon Door5' }
    },
    function () {
      console.log('Open dungeon door 5')
      Animator.playSingleAnimation(entity5, 'open')
    }
  )
}
