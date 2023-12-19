//import { getUserData } from "@decentraland/Identity"
//import { signedFetch } from '@decentraland/SignedFetch'
//import { QuestType } from 'src/hud/dailyQuest'
//import { LEVEL_TYPES } from 'src/LevelManager/types'
import { signedFetch } from '~system/SignedFetch'
import { getUserData } from '~system/UserIdentity'
import { LEVEL_TYPES } from '../LevelManager/types'

//const REDEEM_BASE_URL = `http://localhost:3000`;
const REDEEM_BASE_URL = `https://ipwpq4k3zi.execute-api.us-east-1.amazonaws.com`
const BASE_URL = `https://7ky6d8fqz1.execute-api.us-east-1.amazonaws.com`
const QUESTS_SERVICE_BASE_URL = `https://640sy1ms60.execute-api.us-east-1.amazonaws.com`

export async function postData(url: string, data = {}) {
  // Construct the full URL by appending the provided URL to the BASE_URL
  const fullURL = `${BASE_URL}${url}`

  // Create a request object as specified in the documentation
  const request = {
    url: fullURL,
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response into a JavaScript object
      return JSON.parse(response.body)
    } else {
      // Handle unsuccessful response (e.g., non-2xx status codes)
      throw new Error(`Request failed with status: ${response.status}`)
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

export async function postDataRedeem(url: string, data = {}) {
  // Construct the full URL by appending the provided URL to the REDEEM_BASE_URL
  const fullURL = `${REDEEM_BASE_URL}${url}`

  // Create a request object as specified in the documentation
  const request = {
    url: fullURL,
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Return the response as-is
    return response
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

export async function postDataNoBase(url: string, data = {}) {
  // Create a request object as specified in the documentation
  const request = {
    url,
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Return the response as-is
    return response
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

// update
// UDPAGTE
export async function updateData(url: string, data = {}) {
  // Construct the full URL by appending the provided URL to the BASE_URL
  const fullURL = `${BASE_URL}${url}`

  // Create a request object as specified in the documentation
  const request = {
    url: fullURL,
    init: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response into a JavaScript object
      return JSON.parse(response.body)
    } else {
      // Handle unsuccessful response (e.g., non-2xx status codes)
      throw new Error(`Request failed with status: ${response.status}`)
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

export async function getDataNoBase(url: string, headers = {}) {
  // Create a request object as specified in the documentation
  const request = {
    url,
    init: {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      redirect: 'follow'
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response into a JavaScript object
      return JSON.parse(response.body)
    } else {
      // Handle unsuccessful response (e.g., non-2xx status codes)
      throw new Error(`Request failed with status: ${response.status}`)
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

export async function getData(url: string, headers = {}) {
  // Construct the full URL by appending the provided URL to the BASE_URL
  const fullURL = `${BASE_URL}${url}`

  // Create a request object as specified in the documentation
  const request = {
    url: fullURL,
    init: {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      redirect: 'follow'
    }
  }

  try {
    // Use the signedFetch method to make the HTTP request and add verification headers
    const response = await signedFetch(request)

    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response into a JavaScript object
      return JSON.parse(response.body)
    } else {
      // Handle unsuccessful response (e.g., non-2xx status codes)
      throw new Error(`Request failed with status: ${response.status}`)
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('An error occurred:', error)
    throw error // You can choose to re-throw the error or handle it differently
  }
}

export const LogInventoryToServer = async (actionType: string, itemId: string, count: number) => {
  //const { userId } = await getUserData()
  let userData = await getUserData({})
  let userId = userData.data?.userId

  await postData(`/api/rest/item/action/${userId}`, {
    actionType,
    itemId,
    count
  })
}

export const LogInventoryToLordServer = async (actionType: string, itemId: string, count: number) => {
  //const { userId } = await getUserData()
  let userData = await getUserData({})
  //hard code wallet lord of the plot
  let lordWalletAddress = 0xc8d76f7cf7793ce39d2cf6b06b7fdc29c70656d0

  await postData(`/api/rest/item/action/0xc8d76f7cf7793ce39d2cf6b06b7fdc29c70656d0`, {
    actionType,
    itemId,
    count
  })
}

export const GetPlayerInventory = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/inventory/${userId}`)
}

export const GetPlayerLandedLogs = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return await getData(`/api/rest/all_logs/${userId}`)
}

// export const LogPlayerLanded = async (playerID, timestamp) => {
//   log('in api: ', playerID, timestamp)
//   await postData(`/api/rest/landed_log`, {
//     timestamp,
//     playerID
//   })
// }

export const GetPlayerLevels = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/level/${userId}`)
}

export const GetPlayerLevelLeaderboards = async (levelType: LEVEL_TYPES = LEVEL_TYPES.PLAYER) => {
  return await getData(`/api/rest/leaderbaord/levels/${levelType}`)
}

export const WriteXpToServer = async (levelType: string, level: number, xp: number, total: number) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  await postData(`/api/rest/level/${levelType}/xp/${userId}/add`, {
    level,
    xp,
    total
  })
}

export enum ACTION_LOG_TYPES {
  WOOD_CUT = 'WOOD_CUT',
  MINE_ROCK = 'MINE_ROCK',
  MEAT_GATHER = 'MEAT_GATHER',
  BONE_COLLECTED = 'BONE_COLLECTED',
  DUNGEON_RUN = 'DUNGEON_RUN'
}

export const writeActionLogToServer = async (actionName: string) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  await postData(`/api/rest/action/${userId}/${actionName}`)
}

export const writeDungeonActionLogToServer = async (actionName: string) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  await postData(`/api/rest/dungeon/${userId}/${actionName}`)
}

export const GetPlayerDungeonCount = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return getData(`/api/rest/dungeonCount/${userId}`)
}

export const GetPlayerDungeonCountEasy = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return getData(`/api/rest/dng-easy/${userId}`)
}

export const GetPlayerDungeonEasyLeaderBoard = async () => {
  return getData(`/api/rest/dng-easy`)
}

// Dungeons Easy Stage
export const AddPlayerDungeonCountEasy = async (dng_completed: any) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  let displayName = userData.data?.displayName

  return postData(`/api/rest/dng-easy`, {
    dng_completed,
    action_name: 'test_action',
    username: displayName,
    player_id: userId
  })
}

// Dungeons Easy Stage
export const updatePlayerDungeonCountEasy = async (dng_completed: any) => {
  //api/rest/rounds/:playerID
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return updateData(`/api/rest/dng-easy`, {
    player_id: userId,
    dng_completed
  })
}

//writeActionLogToServer(ACTION_LOG_TYPES.MINE_ROCK)

// export const AddPlayerEquipableItem = async ({ item_type, item_id, equipped = true }) => {
//   const { userId } = await getUserData()

//   await postData(`/api/rest/item/equip/${userId}`, {
//     item_type,
//     item_id,
//     equipped
//   })
// }

// export const RemovePlayerEquipableItem = async ({ item_type, item_id }) => {
//   const { userId } = await getUserData()

//   await postData(`/api/rest/item/${userId}/equip/${item_id}`, {
//     equipped: false
//   })
// }

export const GetPlayerEquipItems = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/item/equip/${userId}`)
}

export const GetPlayerEquippedItems = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/item/equip/${userId}/equiped`)
}

export const AddPetToPlayer = async (petType: string) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  await postData(`/api/rest/pet/${userId}/${petType}`)
}

export const GetPlayerTotalCompletedQuests = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return (await getData(`/api/rest/quests/completed/${userId}/count`))?.value?.[0]?.count || 0
}

export const GetPlayerPets = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/pet/${userId}`)
}

export const AddAvatarModels = async (model: string, weight: number = 0) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return postData(`/api/rest/player/${userId}/avatar`, {
    model,
    weight
  })
}
export const GetPlayerAvatars = async (): Promise<{
  models: { file: string; weight: number }[]
}> => {
  let userData = await getUserData({})
  let userId = userData.data?.userId

  return await getData(`/api/rest/player/${userId}/avatar`)
}

export const CreatePlayer = async (alliance: number, race: number, skill: number) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return postData(`/api/rest/player/${userId}/info`, {
    alliance,
    race,
    skill
  })
}

export const GetPlayerInfo = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  return getData(`/api/rest/player/${userId}/info`)
}

/**
 * Gets a list of today's quests and all the details for those quests
 * @returns : QuestType[] - The array of quests
 */
// export const GetTodaysQuests = async (): Promise<Array<QuestType>> => {
//   let userData = await getUserData({})
//   let userId = userData.data?.userId

//   const response = await fetch(`${QUESTS_SERVICE_BASE_URL}/get_today_quests/${userId}`, {
//     headers: { 'Content-Type': 'application/json' },
//     redirect: 'follow' // manual, *follow, error
//   })
//   if (response.status != 200) throw new Error('Problem getting todays quests!')

//   return response.json()
// }

/**
 * Server side validation which confirms if the user can claim the reward
 * for an individual quest
 * @param questId : number - The quest id for which the user is trying to claim reward
 * @returns : boolean - Whether the user can claim the reward or not
 */
export const CanUserClaimReward = async (questId: number) => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  const response = await fetch(`${QUESTS_SERVICE_BASE_URL}/claim_reward_request/${userId}/${questId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow' // manual, *follow, error
  })
  if (response.status != 200) return false
  return true
}

/**
 * Server side validation which confirms if the user can claim the bonus reward
 * for completing all quests today
 * @returns : boolean - Whether the user can claim the bonus reward
 */
// export const CanUserClaimBonusReward = async () => {
//   let userData = await getUserData({})
//   let userId = userData.data?.userId
//   const response = await fetch(`${QUESTS_SERVICE_BASE_URL}/claim_bonus_reward_request/${userId}`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     redirect: 'follow' // manual, *follow, error
//   })
//   if (response.status != 200) return false
//   return true
// }

// /**
//  * Updates the progress of a player's quest to the DB
//  * @param questId : number - The id for the quest for which the progress needs to be updated
//  * @param progress : number - The latest progress which needs to be updated to the DB
//  * @returns : boolean - The server returns whether the quest has been completed or not
//  */
// export const UpdatePlayerQuestLog = async (questId: number, progress: number) => {
//   let userData = await getUserData({})
//   let userId = userData.data?.userId
//   let response = await fetch(`${QUESTS_SERVICE_BASE_URL}/patch_player_quest_log`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     redirect: 'follow', // manual, *follow, error
//     body: JSON.stringify({
//       playerId: userId,
//       questId: questId,
//       progress: progress
//     })
//   })
//   if (response.status != 200) throw new Error('Something went wrong while updating quest progress')
//   response = await response.json()
//   return response['has_completed']
// }

export const WriteUserUsername = async () => {
  let userData = await getUserData({})
  let userId = userData.data?.userId
  let displayName = userData.data?.displayName

  await postData(`/api/rest/userinfo/${userId}/add`, {
    username: displayName
  })
}
