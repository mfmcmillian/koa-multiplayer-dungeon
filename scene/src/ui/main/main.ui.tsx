import ReactEcs, {UiEntity} from "@dcl/sdk/react-ecs";
import {Color4} from "@dcl/sdk/math";
import {mainJson} from "./main-data";


export class MainConfig {
    static spritesheet = "images/main_spritesheet.png"

    static json = mainJson.frames
    static size = mainJson.meta.size
}


export const HudControls = () => {


// returns UiEntity positioned absolute on the top right of the screen
    return (
        <UiEntity
            uiTransform={{
                positionType: 'absolute',
                position: {top: '0%', right: '0%'},
                width: '20%',
                height: '150px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <UiEntity
                uiTransform={{
                    positionType: 'absolute',
                    position: {top: '0%', right: '0%'},
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                uiBackground={{
                    color: Color4.create(0, 0, 0, 0.5)
                }}

            >
            </UiEntity>
        </UiEntity>
    )

}