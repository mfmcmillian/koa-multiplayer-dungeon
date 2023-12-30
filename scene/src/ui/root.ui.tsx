import ReactEcs, {ReactEcsRenderer} from "@dcl/sdk/react-ecs";
import {
    SkillBarBackground,
    SkillBarContainer,
    SkillBarHealth,
    SkillBarHealthAmount,
    SkillBarSlots
} from "./skillbar/skillbar.ui";
import {inventoryComponents} from "./inventory/inventory.ui";
import {HudControls} from "./main/main.ui";

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(() => ([
        inventoryComponents(),

        <SkillBarContainer items={[
            <SkillBarBackground/>,
            <SkillBarSlots/>,
            <SkillBarHealthAmount/>,
            <SkillBarHealth/>,]}/>,
        ,
        <HudControls/>
    ]));
}

