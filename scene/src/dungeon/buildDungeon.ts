import { GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
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
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
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
    position: Vector3.create(16, 50, 16),
    rotation: Quaternion.create(0, -1, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })
}
