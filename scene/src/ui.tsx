import {
  engine,
  Transform,
  Schemas,
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { BounceScaling, Cube, Spinner } from './components'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs';
import { useState } from 'react';
//import { playRockPaperScissors } from './rps';
//import * as ui from 'dcl-ui-toolkit'

//import { BarStyles } from 'dcl-ui-toolkit';


export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  ReactEcsRenderer
}

  // Inventory state to store items
  const [inventory, setInventory] = useState<any[]>([]);

  // Function to add an item to the inventory
  const addItemToInventory = (item: any) => {
    setInventory((prevInventory) => [...prevInventory, item]);
    console.log(`Added ${item} to the inventory!`);
  };

  // Function to handle item click
  export const handleItemClick = (itemName: string) => {
    console.log(`Clicked on ${itemName}`);
    
    // Add the clicked item to the inventory
    addItemToInventory(itemName);
  };

const uiComponent = () => {


  return (
    <UiEntity
      uiTransform={{
        width: 400,
        height: 500,
        margin: '16px 0 8px 270px',
        padding: 4,
      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
      <UiEntity
        uiTransform={{
          width: '100%', // Adjusted width
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
      >
        <Label
          value='SKILLS'
          fontSize={18}
          uiTransform={{ width: '100%', height: 50, margin: '8px 0' }}
        />
        
        {/* Inventory Menu */}
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '70%', // Adjusted height
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Render clickable items */}
          {Array.from({ length: 16 }, (_, index) => (
            <UiEntity
              key={`inventory-slot-${index}`}
              onMouseDown={() => handleItemClick(`Item${index + 1}`)} 
              uiTransform={{ width: 60, height: 60, margin: '4px' }} 
              uiBackground={{
                textureMode: 'stretch',
                texture: {
                  src: 'images/scene-thumbnail.png', 
                },
              }}
            >
              {/* Render the content of the clickable item */}
              <Label value={`Item${index + 1}`} fontSize={14} />
            </UiEntity>
          ))}
        </UiEntity>

        {/* Close Button */}
        <Button
          uiTransform={{ width: '100%', height: 90, margin: '8px 0' }}
          value='Close Inventory'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            // Add logic to close the inventory menu
            console.log('Closing Inventory...');
          }}
        />
      </UiEntity>
    </UiEntity>
  );
};


function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}