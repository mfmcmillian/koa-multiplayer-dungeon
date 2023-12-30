import {skillbarJson} from "./skillbar-data";
import ReactEcs, {UiEntity} from "@dcl/sdk/react-ecs";
import {getImageAtlasMapping} from "dcl-ui-toolkit/dist/utils/imageUtils";
import {Color4} from "@dcl/sdk/math";

class SkillbarConfig {
    static spritesheet = "images/skillbar_spritesheet.png"

    static json = skillbarJson.frames
    static size = skillbarJson.meta.size
}

export const SkillBarContainer = ({items}:{items: ReactEcs.JSX.Element[]}) => {
    // returns UiEntity positioned absolute on the bottom of the screen with 10% heigh and items centered
    return (
        <UiEntity
            uiTransform={{
                positionType: 'absolute',
                position: {bottom: '0%', left: '0%'},
                width: '100%',
                height: '140px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            {items}

            {/*<UiEntity*/}
            {/*    uiTransform={{*/}
            {/*        positionType: 'absolute',*/}
            {/*        position: {bottom: '0%', left: '0%'},*/}
            {/*        width: '100%',*/}
            {/*        height: '100%',*/}
            {/*        flexDirection: 'row',*/}
            {/*        justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*    }}*/}
            {/*    uiBackground={{*/}
            {/*        color: Color4.Red()*/}
            {/*    }}*/}

            {/*>*/}
            {/*</UiEntity>*/}
        </UiEntity>
    )
}

export const SkillBarHealth = () => {
    // returns UiEntity with items flex centered
    return (
        <UiEntity
            uiTransform={{
                positionType: 'absolute',
                position: {bottom: '20px'},
                width: SkillbarConfig.json["hp frame (1).png"].sourceSize.w,
                height:  SkillbarConfig.json["hp frame (1).png"].sourceSize.h,
            }}
            uiBackground={{
                texture: {
                    src: SkillbarConfig.spritesheet,
                },
                textureMode: 'stretch',
                uvs: getImageAtlasMapping({
                    atlasWidth: SkillbarConfig.size.w,
                    atlasHeight: SkillbarConfig.size.h,
                    sourceLeft: SkillbarConfig.json["hp frame (1).png"].frame.x,
                    sourceTop: SkillbarConfig.json["hp frame (1).png"].frame.y,
                    sourceWidth: SkillbarConfig.json["hp frame (1).png"].frame.w,
                    sourceHeight: SkillbarConfig.json["hp frame (1).png"].frame.h,

                }),
            }}
        >
        </UiEntity>

    )

}

export const SkillBarHealthAmount = () => {
    // returns UiEntity with items flex centered
    return (
        <UiEntity
            uiTransform={{
                positionType: 'absolute',
                position: {top: '-4px'},
                width: SkillbarConfig.json["hp fill.png"].sourceSize.w,
                height:  SkillbarConfig.json["hp fill.png"].sourceSize.h,
            }}
            uiBackground={{
                texture: {
                    src: SkillbarConfig.spritesheet,
                },
                textureMode: 'stretch',
                uvs:
                    getImageAtlasMapping({
                    atlasWidth: SkillbarConfig.size.w,
                    atlasHeight: SkillbarConfig.size.h,
                    sourceLeft: SkillbarConfig.json["hp fill.png"].frame.x,
                    sourceTop: SkillbarConfig.json["hp fill.png"].frame.y,
                    sourceWidth: SkillbarConfig.json["hp fill.png"].frame.w,
                    sourceHeight: SkillbarConfig.json["hp fill.png"].frame.h,

                }),
            }}
        >
        </UiEntity>

    )

}

export const SkillBarSlots = () => {
    // reuturns UiEntity with items flex centered
    return (
        <UiEntity
            uiTransform={{
                positionType: 'absolute',
                position: {bottom: '30px'},
                width: SkillbarConfig.json["skillbar_background.png"].sourceSize.w -48,
                height: '64px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "auto",
            }}
            uiBackground={{
                color: Color4.create(1, 0, 0, 0.5)
            }}
        >


        </UiEntity>
    )
}


export const SkillBarBackground = () => {
    return (
        <UiEntity
            uiTransform={{
                width: SkillbarConfig.json["skillbar_background.png"].sourceSize.w,
                height: SkillbarConfig.json["skillbar_background.png"].sourceSize.h,
                // positionType: 'absolute',
                // position: {bottom: '2%', left: '38%'},
                margin: {left: '8px'},
                justifyContent: 'center',
                flexDirection: 'column',
            }}
            uiBackground={{
                texture: {
                    src: SkillbarConfig.spritesheet,
                },
                uvs: getImageAtlasMapping({
                    atlasWidth: SkillbarConfig.size.w,
                    atlasHeight: SkillbarConfig.size.h,
                    sourceLeft: SkillbarConfig.json["skillbar_background.png"].frame.x,
                    sourceTop: SkillbarConfig.json["skillbar_background.png"].frame.y,
                    sourceWidth: SkillbarConfig.json["skillbar_background.png"].frame.w,
                    sourceHeight: SkillbarConfig.json["skillbar_background.png"].frame.h,

                }),
                color: Color4.White()
            }}

        >

            <UiEntity


                uiTransform={{
                        width: '100%',
                        height: '100%',
                    }}
                    uiBackground={{
                        color: Color4.create(0, 0, 0, 0.5)
                }}
            >

            </UiEntity>
        </UiEntity>
    )
}