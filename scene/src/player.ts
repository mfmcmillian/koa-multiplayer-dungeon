import { getUserData } from '~system/UserIdentity'
import { ITEM_TYPES } from './inventory/playerInventoryMap'
import { getRandomIntRange } from './utils'
import { LEVEL_TYPES } from './LevelManager/types'
import { Item } from './items'
import { PlayerInventory } from './inventory/playerInventory'
import { Character } from './character'

export class Player extends Character {
  static instance: Player

  //public attackAnimation?: () => void
  public questTime: number
  public lastLogin: number
  public username: string | undefined
  public playerDataFetchError: boolean | undefined
  public consecutiveLoginDays: number
  public items: Item[]
  public inventory: PlayerInventory
  // public playerAvatar: PlayerAvatar

  public swordInventoryCount: number

  //HSU
  //public HSU1InventoryCount: ui.UICounter

  //HSU
  //   public fmBodyInventoryCount: ui.UICounter
  //   public fmHeadInventoryCount: ui.UICounter

  //   public bossKill2InventoryCount: ui.UICounter

  public levels: LevelManager
  //   private swordUI: ui.SmallIcon
  //   private shieldUI: ui.SmallIcon
  //   private helmetUI: ui.SmallIcon
  //private defenseLabel: ui.CornerLabel
  //public onInitDone: (player: Player) => void
  // public hasInit: boolean
  public attackBuff?: number
  public luckBuff?: number
  public defBuff?: number
  public critRateBuff?: number
  public critDamageBuff?: number

  //public petManager: PetManager
  public avatarModelList?: string[]

  // public healthBarNew: UIBarManager
  // public expBar: UIBarManager

  //   public hpEvent: Function
  //   public xpEvent: Function
  //   public lvEvent: Function
  //   equiped: string = ITEM_GLBS.SWORD
  //   public race: number
  //   public class: number
  //   public alliance: number

  static getInstance(): Player {
    if (!this.instance) {
      this.instance = new this(1, 0, 1, 100)
    }
    return this.instance
  }

  constructor(attack: number, xp: number, level: number, health: number = 1) {
    super(attack, xp, level, health)
    this.levels = new LevelManager()
    this.levels.setLevel(LEVEL_TYPES.PLAYER, level, xp)
    this.inventory = new PlayerInventory()
    // this.petManager = new PetManager()

    this.avatarModelList = ['models/BaseCharacter.glb']

    // this.levels.onUpdate = ({ type, level, xp, total, levelChange }) => {
    //   switch (type) {
    //     case LEVEL_TYPES.PLAYER:
    //       if (levelChange) {
    //         this.handlePlayerLevelUp(level)
    //       } else {
    //         this.updateXpBar()
    //       }
    //       return
    //   }
    //   this.writeDataToServer()
    // }

    this.swordInventoryCount = 0

    this.items = []

    //this.defenseLabel = new ui.CornerLabel(``, -8850, 0)
    //this.defenseLabel.hide()
    this.luckBuff = 0
    this.critRateBuff = 1
    this.critDamageBuff = 100
    this.attackBuff = 0
    this.defBuff = 0
    this.lastLogin = 0
    this.consecutiveLoginDays = 0
    this.questTime = 99999
    // this.lvEvent(this.level)
    // StatusHUD.updateLv(this.level)
    // executeTask(async () => {
    //   await WriteUserUsername()
    // })
  }

  // async CreatePlayerAvatar(shape?: GLTFShape) {
  //     const { userId } = await getUserData()
  //     this.playerAvatar = new PlayerAvatar(
  //         userId,
  //         shape || new GLTFShape("models/Knight.glb")
  //     )
  // }

  // SwapModel(shape: GLTFShape) {
  //     if (this.playerAvatar) {
  //         this.playerAvatar.swapModel(shape)
  //     } else {
  //         executeTask(() => this.CreatePlayerAvatar(shape))
  //     }
  // }

  //   getDefensePercent(): number {
  //     const defense =
  //       super.getDefensePercent() + this.defBuff ||
  //       0 +
  //         this.items.reduce((accm, item: Item) => {
  //           const buff: buffItem[] | buffItem = item.buff
  //           if (item.type === itemTypes.SHIELD) {
  //             if (Array.isArray(buff)) {
  //               //@ts-ignore
  //               const b = buff.find((buff) => buff.type)
  //               if (b) {
  //                 return accm + b.value
  //               }
  //               return accm
  //             }
  //             return accm + buff.value
  //           }
  //           return accm
  //         }, 0)
  //     const safeDefense = defense >= 1 ? 0.99 : defense
  //     const percentageDef = safeDefense * 100
  //     this.defenseLabel.set(`Player Defense: ${percentageDef}%`)
  //     setTimeout(2000, () => this.defenseLabel.hide())
  //     this.defenseLabel.show()
  //     return safeDefense
  //   }

  //   attackAnimation() {
  //     //log("attack animation")
  //     this.playerAvatar?.playAttack()
  //   }

  //   impactAnimation() {
  //     //log("attack animation")
  //     this.playerAvatar?.playImpact()
  //   }

  // addAvatarModel(model: string, weight: number = 0) {
  //     this.avatarModelList.push(model)
  //     executeTask(() => AddAvatarModels(model, weight))
  // }

  //   getLuckRange(): number {
  //     return super.getLuckRange() + this.getLuckBuffs()
  //   }

  //   getLuckBuffs(): number {
  //     return (
  //       this.luckBuff +
  //       this.items.reduce((accm, item: Item) => {
  //         const buff: buffItem[] | buffItem = item.buff
  //         if (item.type === itemTypes.HELMET) {
  //           if (Array.isArray(buff)) {
  //             //@ts-ignore
  //             const b = buff.find((buff) => buff.type)
  //             if (b) {
  //               return accm + b.value
  //             }
  //             return accm
  //           }
  //           return accm + buff.value
  //         }
  //         return accm
  //       }, 0)
  //     )
  //   }

  //   getCritRate(): number {
  //     return this.critRateBuff
  //   }

  //   getCritDamage(): number {
  //     return this.critDamageBuff
  //   }

  chopTree() {
    const treeCount = this.inventory.getItemCount(ITEM_TYPES.TREE)
    //log(treeCount)
  }

  // checkHealth() {
  //     if (this.health <= 0) {
  //         ui.displayAnnouncement("You died!", 5, Color4.Red(), 50)
  //         //movePlayerTo({ x: 80.51, y: 55, z: 19.49 })
  //         this.health = this.maxHealth * 0.5
  //         this.updateHealthBar()
  //         return true
  //     }
  //     return false
  // }

  //   reduceHealth(attack: number): void {
  //     super.reduceHealth(attack)
  //     this.updateHealthBar()
  //   }

  //   refillHealthBar(percentage = 1, playAnimation = true) {
  //     this.health += this.maxHealth * percentage
  //     if (this.health > this.maxHealth) {
  //       this.health = this.maxHealth
  //     }
  //     this.updateHealthBar()

  //     if (playAnimation === true) {
  //       applyHealToLocation(Camera.instance.feetPosition)
  //     }
  //   }

  //   depleteHealthBar(percentage = 1) {
  //     this.health -= this.maxHealth * percentage
  //     // if (this.health > this.maxHealth) {
  //     //     this.health = this.maxHealth
  //     // }
  //     this.updateHealthBar()
  //   }
  //   getLevel() {
  //     return this.level
  //   }
  //   subscribeHpEvent(f: Function) {
  //     this.hpEvent = f
  //   }
  //   subscribeXpEvent(f: Function) {
  //     this.xpEvent = f
  //   }
  //   subscribeLvEvent(f: Function) {
  //     this.lvEvent = f
  //   }
  //   updateHealthBar() {
  //     this.hpEvent(this.health, this.maxHealth)
  //     StatusHUD.updateHp(this.health, this.maxHealth)
  //     InventoryHUD.getInstance().pages[0].updateHp(`${this.health} / ${this.maxHealth}`)
  //   }

  //   updateXpBar() {
  //     const level = this.levels.getLevel(LEVEL_TYPES.PLAYER)
  //     this.xpEvent(
  //       this.levels.getXp(LEVEL_TYPES.PLAYER) - (level > 1 ? LevelManager.xpRequiredForNextLevel(level - 1) : 0),
  //       LevelManager.xpRequiredForNextLevel(level) - (level > 1 ? LevelManager.xpRequiredForNextLevel(level - 1) : 0)
  //     )
  //   }

  //   uiCallback: Function

  //   async fetchPlayerStats(uiCallback?: Function) {
  //     if (!this.uiCallback) this.uiCallback = uiCallback
  //     try {
  //       const { userId, displayName } = await getUserData()

  //       // get current date and time

  //       //

  //       if (userId) {
  //         ;(await GetPlayerInventory()).computed_player_inventory.forEach(({ itemId, count }) => {
  //           this.inventory.setItem(itemId, count)
  //         })
  //         log('player inventory: initial')

  //         // const levels = {
  //         //     levels: {
  //         //         level_type: 0,
  //         //         level: 15,
  //         //         xp: 5
  //         //     }
  //         // }
  //         const levels = await GetPlayerLevels()

  //         try {
  //           // Create a new date object and get its ISO string representation
  //           const dateObj = new Date()
  //           const timestamp = dateObj.toISOString()

  //           // Retrieve the existing player logs
  //           const existingLogs = await GetPlayerLandedLogs()
  //           log('existing Logs: ', existingLogs)
  //           log('timeStamp and timeline count: ', timestamp, existingLogs.player_logs.length)

  //           if (existingLogs.player_logs.length > 0) {
  //             // Use reduce to find the most recent log by comparing timestamps
  //             let latestTimestamp = existingLogs.player_logs.reduce((latest, log) => {
  //               let currentTimestamp = new Date(log.timestamp)
  //               // If the current log's timestamp is later than the latest, use it as the new latest
  //               return currentTimestamp.getTime() > latest.getTime() ? currentTimestamp : latest
  //             }, new Date(existingLogs.player_logs[0].timestamp))

  //             // Convert the latest timestamp and the current timestamp to Date objects
  //             let date1 = new Date(latestTimestamp)
  //             let date2 = new Date(timestamp)
  //             //@ts-ignore
  //             // Find the difference in time between the two timestamps
  //             let differenceInMilliseconds = Math.abs(date2 - date1)
  //             log('dates: ', date2, date1)

  //             // Convert the difference in time from milliseconds to hours
  //             let differenceInHours = Math.round(differenceInMilliseconds / 1000 / 60 / 60)

  //             // If the difference in time is 24 hours or more give dungeon tokens
  //             log('difference in hours: ', differenceInHours)
  //             if (differenceInHours >= 24) {
  //               const response = await LogPlayerLanded(userId, timestamp)
  //               this.handleDungeonDailyPassReset()
  //               log('Got D Tokens', response)
  //             }
  //           } else {
  //             //if player has no entry for landing, recourd a new entry and give dungeon tokens
  //             const response = await LogPlayerLanded(userId, timestamp)
  //             this.handleDungeonDailyPassReset()
  //             log('NO D Tokens', response)
  //           }
  //         } catch (error) {
  //           // handle error, perhaps by logging it
  //           //@ts-ignore
  //           console.error(error)
  //         }

  //         for (let l in levels.levels) {
  //           const i = levels.levels[l]
  //           if (LEVEL_TYPES.PLAYER) this.levels.setLevel(i.level_type, i.level, i.xp)
  //           else this.levels.setLevel(i.level_type, i.level, i.xp)
  //           this.uiCallback(i.type, i.level)
  //           // this.levels.createOrUpdateLevelLabel(i.level_type)
  //           // MainHUD.getInstance().updateProfLevel(i.type, i.level)
  //         }

  //         // if (this.levels.getLevel(LEVEL_TYPES.PLAYER) <= 60) {
  //         //     this.maxHealth =
  //         //         this.maxHealth +
  //         //         this.levels.getLevel(LEVEL_TYPES.PLAYER)
  //         // } else {
  //         //     this.maxHealth = this.maxHealth + 60
  //         // }

  //         this.maxHealth = this.maxHealth + this.levels.getLevel(LEVEL_TYPES.PLAYER)

  //         //this.updateHealthBar()

  //         log(`Adding attack level bonus ${this.levels.getLevel(LEVEL_TYPES.PLAYER)}`)

  //         // if (this.levels.getLevel(LEVEL_TYPES.PLAYER) > 20) {
  //         //     skillsUpgrade.set(`Upgraded Skills Unlocked!`)
  //         // }

  //         if (this.levels.getLevel(LEVEL_TYPES.PLAYER) <= 60) {
  //           this.attack = this.attack + this.levels.getLevel(LEVEL_TYPES.PLAYER)
  //         } else {
  //           this.attack = this.attack + 60
  //         }

  //         this.refillHealthBar(1, false)

  //         this.updateXpBar()

  //         //this.username = username

  //         // log(this.getXpLabel())
  //         // log("player inited")

  //         // Update UI
  //         InventoryHUD.getInstance().pages[0].updatePAtk(`${this.getPlayerAttack(false)}`)
  //         InventoryHUD.getInstance().pages[0].updatePDef(`${this.getDefensePercent()}`)
  //         InventoryHUD.getInstance().pages[0].updateLuck(`${this.getLuckRange()}`)

  //         //InventoryHUD.getInstance().updateHp(``)

  //         // Run consecutive days reward check
  //         //this.updateLoginReward()

  //         const items = await GetPlayerEquippedItems()

  //         items?.items.forEach((i) => {
  //           const itemMeta = ItemTree[i.item_id]

  //           if (itemMeta) {
  //             const item = new Item(i.item_id, itemMeta.name, itemMeta.type, itemMeta.buff, itemMeta.image)
  //             this.addItem(item)
  //           }
  //         })
  //         //log("player equipped items", items)

  //         const data = await GetPlayerAvatars()

  //         if (data?.models?.length) {
  //           this.avatarModelList = data?.models?.sort((a, b) => (a?.weight > b?.weight ? 1 : -1)).map((i) => i.file)
  //         }

  //         this.lvEvent(this.levels.getLevel(LEVEL_TYPES.PLAYER))
  //         StatusHUD.updateLv(this.levels.getLevel(LEVEL_TYPES.PLAYER))

  //         const { pets } = (await GetPlayerPets()) || { pets: [] }

  //         const dungeonLevels = await GetPlayerDungeonCount()
  //         DungeonStage.increase(dungeonLevels?.result?.runs?.count)
  //         DungeonStageLabel.value = `Stage: ${DungeonStage.read()}`

  //         const response1 = await GetPlayerDungeonCountEasy()
  //         // log(
  //         //     "easy count again........",
  //         //     response1.dungeon_action_easy.length
  //         // )
  //         if (response1.dungeon_action_easy.length === 0) {
  //           AddPlayerDungeonCountEasy(1)
  //           //ui.displayAnnouncement("REFRESH", 20)
  //           //log({ response })
  //         }
  //         // log(
  //         //     `EASY COUNT>>>>>>>>>: ${response1?.dungeon_action_easy[0].dungeons_completed}`
  //         // )

  //         let dngEasyCount = null
  //         dngEasyCount = response1?.dungeon_action_easy[0].dungeons_completed + 1

  //         if (dngEasyCount && dngEasyCount > 1) {
  //           // update the exisiting record with extra count
  //           // const updateREsponse = await updatePlayerDungeonCountEasy(
  //           //     dngEasyCount
  //           // )
  //           // log({ updateREsponse })
  //         }

  //         log('player dungeon level', dungeonLevels?.result?.runs?.count)

  //         if (pets?.length) {
  //           this.petManager.setPets(pets.map(({ pet }) => pet))
  //         }

  //         //log("set levels")
  //         this.updateHealthBar()
  //         if (this.onInitDone) {
  //           this.onInitDone(this)
  //         }
  //         this.hasInit = true
  //         //log("player initied")

  //         // StatusHUD.show()
  //         this.updateXpBar()
  //         await this.CreatePlayerAvatar(new GLTFShape('models/Knight.glb'))
  //       }
  //     } catch (e) {
  //       //log("error", e.toString())
  //       if (Object.keys(e).length > 0) this.playerDataFetchError = true
  //     }
  //   }

  /**
   * Handles the reset of daily passes for the dungeon.
   * Ensures the user has exactly 7 tokens after the reset.
   */
  handleDungeonDailyPassReset() {
    // Get the current count of ICESHARD tokens from the user's inventory
    let currentDungeonTokens = this.inventory.getItemCount(ITEM_TYPES.ICESHARD)

    // If the user has 7 or fewer tokens...
    if (currentDungeonTokens <= 7) {
      // Calculate the number of tokens they are owed to reach 7
      const tokensOwed = 7 - currentDungeonTokens
      // Add the owed tokens to their inventory
      this.inventory.incrementItem(ITEM_TYPES.ICESHARD, tokensOwed)
    } else {
      // If the user has more than 7 tokens...
      // Calculate the surplus tokens to be removed
      const surplusTokens = currentDungeonTokens - 7
      // Deduct the surplus tokens from their inventory
      this.inventory.reduceItem(ITEM_TYPES.ICESHARD, surplusTokens)
    }
  }

  //   handleDungeonPassUse(dungeonDifficulty) {
  //     const iceShardCount = this.inventory.getItemCount(ITEM_TYPES.ICESHARD)
  //     const iceHeartCount = this.inventory.getItemCount(ITEM_TYPES.ICEHEART)

  //     switch (dungeonDifficulty) {
  //       case 'easy':
  //         if (iceShardCount >= 1) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 1)
  //         } else if (iceHeartCount >= 1) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 1)
  //         }
  //         break
  //       case 'hard':
  //         if (iceShardCount >= 2) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 2)
  //         } else if (iceShardCount === 1 && iceHeartCount >= 1) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 1)
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 1)
  //         } else if (iceHeartCount >= 2) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 2)
  //         }
  //         break
  //       case 'nightmare':
  //         if (iceShardCount >= 3) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 3)
  //         } else if (iceShardCount === 2 && iceHeartCount >= 1) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 2)
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 1)
  //         } else if (iceShardCount === 1 && iceHeartCount >= 2) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICESHARD, 1)
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 2)
  //         } else if (iceHeartCount >= 3) {
  //           this.inventory.reduceItem(ITEM_TYPES.ICEHEART, 3)
  //         }
  //         break
  //     }
  //   }

  // handleDungeonPassUse(dungeonDifficulty: "easy" | "hard" | "nightmare") {
  //     let requiredItemCount

  //     switch (dungeonDifficulty) {
  //         case "easy":
  //             requiredItemCount = 1
  //             break
  //         case "hard":
  //             requiredItemCount = 2
  //             break
  //         case "nightmare":
  //             requiredItemCount = 3
  //             break
  //         default:
  //             log(`Invalid dungeon difficulty: ${dungeonDifficulty}`)
  //             return
  //     }

  //     if (
  //         this.inventory.getItemCount(ITEM_TYPES.ICESHARD) >=
  //         requiredItemCount
  //     ) {
  //         this.inventory.reduceItem(ITEM_TYPES.ICESHARD, requiredItemCount)
  //     } else if (
  //         this.inventory.getItemCount(ITEM_TYPES.ICEHEART) >=
  //         requiredItemCount
  //     ) {
  //         this.inventory.reduceItem(ITEM_TYPES.ICEHEART, requiredItemCount)
  //     } else {
  //         log(`Insufficient items for difficulty: ${dungeonDifficulty}`)
  //     }
  // }

  //   rollDice() {
  //     const max = 20 + this.levels.getLevel(LEVEL_TYPES.PLAYER) / 2
  //     const min = (this.getLuckBuffs() / 100) * max

  //     const randomNumber = getRandomIntRange(Math.round(min), Math.round(max))

  //     //const value2 = this.getLuckBuffs() / 2

  //     return randomNumber
  //   }

  //   handlePlayerLevelUp(level: number) {
  //     this.lvEvent(level)
  //     StatusHUD.updateLv(level)
  //     if (this.levels.getLevel(LEVEL_TYPES.PLAYER) <= 60) {
  //       this.maxHealth += 4
  //       this.attack++
  //     }
  //     this.refillHealthBar(1, true)

  //     this.updateXpBar()
  //     this.inventory.incrementItem(ITEM_TYPES.CHICKEN, 20 + this.level)
  //     this.inventory.incrementItem(ITEM_TYPES.ROCK, 20 + this.level)
  //     this.inventory.incrementItem(ITEM_TYPES.BONE, 20 + this.level)
  //     this.inventory.incrementItem(ITEM_TYPES.TREE, 20 + this.level)

  //     this.inventory.incrementItem(ITEM_TYPES.BERRY, 20 + this.level)
  //     this.inventory.incrementItem(ITEM_TYPES.BONE, 2)
  //     this.writeDataToServer()
  //     const releaseNotes = new UIImage(canvas, new Texture('images/lvl_up_2.png'))
  //     releaseNotes.name = 'clickable-image'
  //     releaseNotes.width = '500px'
  //     releaseNotes.height = '500px'
  //     releaseNotes.sourceWidth = 500
  //     releaseNotes.sourceHeight = 500
  //     releaseNotes.isPointerBlocker = true
  //     releaseNotes.positionX = 2
  //     releaseNotes.positionY = 80
  //     releaseNotes.visible = true
  //     setTimeout(6 * 1000, () => {
  //       releaseNotes.visible = false
  //     })
  //   }

  //   updateAtkBuff(value: number) {
  //     this.attackBuff += value
  //     InventoryHUD.getInstance().pages[0].updatePAtk(`${this.getPlayerAttack(false)}`)
  //   }

  //   updateDefBuff(value: number) {
  //     this.defBuff += value
  //     InventoryHUD.getInstance().pages[0].updatePDef(`${this.getDefensePercent()}`)
  //   }

  //   updateLuckBuff(value: number) {
  //     this.luckBuff += value
  //     InventoryHUD.getInstance().pages[0].updateLuck(`${this.getLuckRange()}`)
  //   }

  //   updateCritDmg(value: number) {
  //     this.critDamageBuff += value
  //     InventoryHUD.getInstance().pages[0].updateCritDamage(`${this.getCritDamage()}%`)
  //   }

  //   updateCritRate(value: number) {
  //     this.critRateBuff += value
  //     InventoryHUD.getInstance().pages[0].updateCritRate(`${this.getCritRate()}%`)
  //   }

  //   updateMaxHp(value: number) {
  //     this.maxHealth += value
  //     this.updateHealthBar()
  //   }

  //   getPlayerAttack(isCriticalAttack = false) {
  //     return (
  //       (this.attack +
  //         (this.attackBuff || 0) +
  //         this.items.reduce((accm, item: Item) => {
  //           const buff: buffItem[] | buffItem = item.buff
  //           if (item.type === itemTypes.SWORD) {
  //             if (Array.isArray(buff)) {
  //               //@ts-ignore
  //               const b = buff.find((buff) => buff.type)
  //               if (b) {
  //                 return accm + b.value
  //               }
  //               return accm
  //             }
  //             return accm + buff.value
  //           }
  //           return accm
  //         }, 0)) *
  //       (isCriticalAttack ? 2 : 1)
  //     )
  //   }
  //   async addItem(item: Item) {
  //     const toDelete = this.items.reduce((acc, i) => (i.type === item.type ? i : acc), null)
  //     this.items = this.items.filter((iItem) => iItem.type !== item.type)

  //     this.items.push(item)

  //     if (toDelete) {
  //       await RemovePlayerEquipableItem({
  //         item_type: toDelete.type,
  //         item_id: toDelete.id
  //       })
  //     }

  //     await AddPlayerEquipableItem({
  //       item_type: item.type,
  //       item_id: item.id,
  //       equipped: true
  //     })
  //   }

  //   async writeDataToServer() {
  //     if (this.playerDataFetchError) return ui.displayAnnouncement('Error: Please refresh page to load your stats', 600)

  //     const { userId } = await getUserData()

  //     const fmHead = this.fmHeadInventoryCount.read()
  //     const fmBody = this.fmBodyInventoryCount.read()

  //     const consecutiveLoginDays = this.consecutiveLoginDays
  //     const lastLogin = this.lastLogin
  //     const questTime = this.questTime
  //     const username = this.username
  //     const polisher1 = this.polisher1 || null
  //     const polisher2 = this.polisher2 || null
  //     const polisher3 = this.polisher3 || null
  //     const polisher4 = this.polisher4 || null
  //     const polisherReward1 = this.polisherReward1 || null
  //     const polisherReward2 = this.polisherReward2 || null
  //     const polisherReward3 = this.polisherReward3 || null
  //     const polisherReward4 = this.polisherReward4 || null

  //     const data = eth.toHex(
  //       `uuid=${userId}&fmHead=${fmHead}&fmBody=${fmBody}&lastLogin=${lastLogin}&username=${username}&consecutiveLoginDays=${consecutiveLoginDays}&polisher1=${polisher1}&polisher2=${polisher2}&polisher3=${polisher3}&polisher4=${polisher4}&polisherReward1=${polisherReward1}&polisherReward2=${polisherReward2}&polisherReward3=${polisherReward3}&polisherReward4=${polisherReward4}${
  //         questTime ? `&questTime=${questTime}` : ''
  //       }`
  //     )
  //     try {
  //       //fetch(`${LAMBDA_URL}/update-stats?data=${data}`)
  //     } catch (e) {
  //       //log("db update failed try again later")
  //     }
  //   }
}

interface LevelItem {
  type: LEVEL_TYPES
  level: number
  xp: number
}

interface onUpdatePayload {
  type: LEVEL_TYPES
  level: number
  xp: number
  total: number
  levelChange?: boolean
}

class LevelManager {
  levels: Record<LEVEL_TYPES | string, LevelItem>

  public onUpdate?: (payload: onUpdatePayload) => void

  constructor() {
    this.levels = {}
  }

  static xpRequiredForNextLevel(level: number) {
    return 500 * Math.pow(level, 2) - 500 * level + 1000
  }

  static getLabelText(name: string, level: number, xp: number) {
    return `${name} Level: ${level} xp: ${xp}`
  }

  createOrUpdateLevelLabel(type: LEVEL_TYPES) {
    const { level, xp } = this.levels?.[type] || {}
    //Player.getInstance().uiCallback(type, level)
  }

  updateItem(type: LEVEL_TYPES, item: LevelItem) {
    // this.levels[type] = {
    //     type,
    //     ...(this.levels[type] || {}),
    //     ...item,
    // }
    // this.createOrUpdateLevelLabel(type)
  }

  static shouldLevelUp(level: number, xp: number) {
    return xp >= LevelManager.xpRequiredForNextLevel(level)
  }

  addXp(type: LEVEL_TYPES, xp: number) {
    const currentXp = this.levels[type]?.xp || 0
    let newXp = xp + currentXp
    const currentLevel = this.levels[type]?.level || 1
    const shouldLevelUp = LevelManager.shouldLevelUp(currentLevel, newXp)
    const increaseBy = shouldLevelUp ? 1 : 0
    const newLevel = currentLevel + increaseBy

    this.updateItem(type, {
      level: newLevel,
      xp: newXp,
      type
    })

    this.onUpdate?.({
      type: type,
      level: newLevel,
      xp: xp,
      total: newXp,
      levelChange: shouldLevelUp
    })
    //WriteXpToServer(type, newLevel, xp, newXp)
  }

  getXp(type: LEVEL_TYPES) {
    return this.levels[type]?.xp || 0
  }

  getLevel(type: LEVEL_TYPES) {
    return this.levels[type]?.level || 1
  }

  setLevel(type: LEVEL_TYPES, level: number, xp: number = 0) {
    this.levels[type] = {
      type,
      level,
      xp
    }
  }
}

export const player = Player.getInstance()
