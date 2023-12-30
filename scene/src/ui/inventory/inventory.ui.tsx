import {
    Color4,
} from '@dcl/sdk/math';
import ReactEcs, {Button, Label, ReactEcsRenderer, UiEntity} from '@dcl/sdk/react-ecs';


let skillBar: { name: string | null; image: string }[] = Array(2).fill({name: null, image: ''});

let myState: any[] = [];

function setMyState(newState: any[]) {
    myState = newState;
}

let inventory: any[] = [];
let selectedItem: string | null = null;

const addItemToMyState = (itemName: any) => {
    setMyState([...myState, itemName]);
};

const addItemToInventory = (item: {
    id: number;
    name: any;
    quantity: number;
    attackpower: number;
    spellpower: number;
    hp: number
}) => {
    inventory = [...inventory, item];
};

let isInfoMenuOpen: boolean = false;
let selectedItemDetails: {
    id: number;
    name: any;
    quantity: number;
    attackpower: number;
    spellpower: number;
    hp: number
} | null = null;

const openInfoMenu = (itemDetails: {
    id: number;
    name: any;
    quantity: number;
    attackpower: number;
    spellpower: number;
    hp: number
}) => {
    isInfoMenuOpen = true;
    selectedItemDetails = itemDetails;
};

const closeInfoMenu = () => {
    isInfoMenuOpen = false;
    selectedItemDetails = null;
};

const handleEquipItem = (itemName: string | null) => {
    if (itemName) {
        // Check if the item is already in the skill bar
        const skillBarIndex = skillBar.findIndex((item) => item.name === itemName);

        if (skillBarIndex === -1) {
            // Find an empty slot in the skill bar
            const emptySlotIndex = skillBar.findIndex((item) => item.name === null);

            if (emptySlotIndex !== -1) {
                // Add the item to the skill bar
                skillBar[emptySlotIndex] = {name: itemName, image: `images/${itemName.toLowerCase()}-image.png`};
                console.log(`Item '${itemName}' added to skill bar at slot ${emptySlotIndex + 1}.`);
            } else {
                console.log('No empty slot in the skill bar.');
            }
        } else {
            console.log(`Item '${itemName}' is already in the skill bar at slot ${skillBarIndex + 1}.`);
        }
    }
};

const handleUnequipItem = (itemName: string | null) => {
    if (itemName) {
        // Find the item in the skill bar
        const skillBarIndex = skillBar.findIndex((item) => item.name === itemName);

        if (skillBarIndex !== -1) {
            // Remove the item from the skill bar
            // Setting the image to a default image or an empty string
            skillBar[skillBarIndex] = {name: null, image: 'images/white-image.png'}; // or image: ''
            console.log(`Item '${itemName}' has been removed from the skill bar at slot ${skillBarIndex + 1}.`);
        } else {
            console.log(`Item '${itemName}' is not found in the skill bar.`);
        }
    }
};


export const handleItemClick = (itemName: string, attackPower: number, spellPower: number, hp: number) => {
    console.log(`Clicked on ${itemName}`);

    const inventoryLimit = 20;

    if (inventory.length >= inventoryLimit) {
        console.log('Inventory limit exceeded. Cannot add more items.');
        return;
    }

    addItemToMyState(itemName);

    const newItem = {
        id: Date.now(),
        name: itemName,
        quantity: 1,
        attackpower: attackPower,
        spellpower: spellPower,
        hp: hp
    };

    addItemToInventory(newItem);

    console.log('myState:', myState);
    console.log('inventory:', inventory);

};


export const inventoryComponents = () => {
    const inventoryLimit = 20;


    const components = myState.slice(0, inventoryLimit).map((itemName, index) => (

        //const item = inventory.find(i => i.name === itemName);

        <UiEntity
            key={`inventory-slot-${index}`}
            onMouseDown={() => openInfoMenu({
                id: Date.now(),
                name: itemName,
                quantity: 1,
                attackpower: 0,
                spellpower: 0,
                hp: 0
            })}
            uiTransform={{width: 60, height: 60, margin: '4px'}}
            uiBackground={{
                textureMode: 'stretch',
                texture: {
                    src: `images/${itemName.toLowerCase()}-image.png`,
                },
            }}
        >
            {/* <Label
        value={itemName}
        fontSize={14}
        uiTransform={{ width: '100%', height: 125, margin: '8px 0' }}
      /> */}
        </UiEntity>
    ));

    const skillBarComponents = skillBar.map(({name, image}, index) => (
        <UiEntity
            key={`skill-bar-slot-${index}`}
            uiTransform={{
                width: '20%', // Adjust width as needed for each skill bar slot
                height: '100%', // Use full height of the container
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '4px',
            }}
        >
            <UiEntity
                uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                        src: image,
                    },
                }}
                uiTransform={{
                    width: 60, // Square width
                    height: 60, // Square height (same as width)
                    margin: '4px', // Space between image and label
                }}
            />
            <Label
                value={name || 'Empty'}
                fontSize={14}
                uiTransform={{
                    position: {right: -15, top: 0},
                    width: '100%', // Take full width to center align the text
                    //height: 'auto', // Height adjusts to content
                    alignItems: 'center',
                }}
            />
        </UiEntity>
    ));


    return (
        <UiEntity
            uiTransform={{
                width: 400,
                height: 500,
                margin: '16px 0 8px 270px',
                padding: 4,
            }}
            uiBackground={{color: Color4.create(0.5, 0.8, 0.1, 0.6)}}
        >
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                uiBackground={{color: Color4.fromHexString("#70ac76ff")}}
            >
                <Label
                    value='INVENTORY'
                    fontSize={18}
                    uiTransform={{width: '100%', height: 50, margin: '8px 0'}}
                />

                <UiEntity
                    uiTransform={{
                        width: '100%',
                        height: '70%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {components}
                </UiEntity>


                {isInfoMenuOpen && selectedItemDetails && (
                    <ItemInfoMenu/>
                )}

                <Button
                    uiTransform={{
                        width: '102%',
                        height: 30,
                        position: {right: 0, top: 20},
                        margin: '8px 0'
                    }}
                    value='Close Inventory'
                    variant='primary'
                    fontSize={14}
                    onMouseDown={() => {
                        console.log('Closing Inventory...');
                    }}
                />
                <UiEntity
                    uiTransform={{
                        position: {right: -300, top: 200},
                        width: '100%',
                        height: '20%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {skillBarComponents}
                </UiEntity>
            </UiEntity>

        </UiEntity>
    );
};


const ItemInfoMenu = () => {
    const selectedItemImage = selectedItemDetails
        ? `images/${selectedItemDetails.name.toLowerCase()}-image.png`
        : '';


    return (
        <UiEntity
            uiTransform={{
                width: '400px',
                height: '70%',
                positionType: "absolute",
                position: {right: -500},
                justifyContent: 'center',
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}
            uiBackground={{color: Color4.create(0.5, 0.8, 0.1, 0.6)}}
        >
            {/* Display the image */}
            <UiEntity
                uiTransform={{
                    width: 160, height: 160,
                    positionType: "absolute",
                    position: {right: 115, top: 50},
                    justifyContent: 'center',
                    display: "flex",
                    alignItems: "center", // Adjust this property for vertical alignment
                    flexDirection: "row"
                }}
                uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                        src: selectedItemImage,
                    },
                }}
            />
            <Label value={`Item ID: ${selectedItemDetails?.id}`} fontSize={16} uiTransform={{
                width: '400px',
                height: '100%',
                positionType: "absolute",
                position: {right: 0, top: 80},
                justifyContent: 'center',
                display: "flex",
                alignItems: "center", // Adjust this property for vertical alignment
                flexDirection: "row"
            }}/>
            <Label value={`Item Name: ${selectedItemDetails?.name}`} fontSize={16} uiTransform={{
                width: '400px',
                height: '100%',
                positionType: "absolute",
                position: {right: 0, top: 100},
                justifyContent: 'center',
                display: "flex",
                alignItems: "center", // Adjust this property for vertical alignment
                flexDirection: "row"
            }}/>
            <Label value={`Attack: ${selectedItemDetails?.attackpower}`} fontSize={16} uiTransform={{
                width: '400px',
                height: '100%',
                positionType: "absolute",
                position: {right: 0, top: 120},
                justifyContent: 'center',
                display: "flex",
                alignItems: "center", // Adjust this property for vertical alignment
                flexDirection: "row"
            }}/>

            {/* Equip button */}
            <Button
                uiTransform={{
                    width: '33%', // Adjusted to 33% to fit three buttons
                    height: 30,
                    position: {right: 0, top: 160},
                    margin: '8px 0',
                }}
                value='Equip'
                variant='primary'
                fontSize={14}
                onMouseDown={() => {
                    handleEquipItem(selectedItemDetails?.name);
                    closeInfoMenu();
                    console.log('Item equipped! Adding to skill bar.');
                }}
            />

            {/* Unequip button */}
            <Button
                uiTransform={{
                    width: '33%', // Same width as the other buttons
                    height: 30,
                    position: {right: 0, top: 160},
                    margin: '8px 0',
                }}
                value='Unequip'
                variant='primary'
                fontSize={14}
                onMouseDown={() => {
                    // Add logic for unequipping the item
                    handleUnequipItem(selectedItemDetails?.name);
                    closeInfoMenu();
                    console.log('Item unequipped.');
                }}
            />

            {/* Close button */}
            <Button
                uiTransform={{
                    width: '33%', // Adjusted to 33%
                    height: 30,
                    position: {right: 0, top: 160},
                    margin: '8px 0',
                }}
                value='Close'
                variant='primary'
                fontSize={14}
                onMouseDown={() => {
                    closeInfoMenu();
                }}
            />
        </UiEntity>
    );
};


