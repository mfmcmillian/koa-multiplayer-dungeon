import { Animator, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
export * from '@dcl/sdk'
import * as utils from '@dcl-sdk/utils'

let entity = engine.addEntity()
let entity2 = engine.addEntity()
let entity3 = engine.addEntity()
let entity4 = engine.addEntity()
let entity5 = engine.addEntity()

export function buildAntrom() {
  GltfContainer.create(entity, {
    src: 'models/antromModels/AntromCastle2Test.glb'
  })

  GltfContainer.create(entity2, {
    src: 'models/antromModels/AntromCastleTest.glb'
  })

  GltfContainer.create(entity3, {
    src: 'models/antromModels/AntromCavesTest.glb'
  })

  GltfContainer.create(entity4, {
    src: 'models/antromModels/AntromColliderTest.glb'
  })

  GltfContainer.create(entity5, {
    src: 'models/antromModels/AntromForestTest.glb'
  })

  Transform.create(entity, {
    position: Vector3.create(16, 0, 16),
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
}
