import { getUserData } from '~system/UserIdentity'

export async function checkWearableInUserData(URN: any) {
  let userData = await getUserData({})

  if (userData && userData.data && userData.data.avatar) {
    let wearables = userData.data.avatar.wearables

    let result = false

    if (wearables) {
      for (const wearable of wearables) {
        if (wearable === `urn:decentraland:matic:collections-v2:${URN}`) {
          result = true
          break // Exit the loop since we found the wearable
        }
      }
    }

    return result
  }

  // Handle the case when userData, userData.data, or userData.data.avatar is undefined
  return false
}
