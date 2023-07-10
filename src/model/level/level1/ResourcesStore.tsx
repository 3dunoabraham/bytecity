import { Box, Cylinder, Torus } from "@react-three/drei";
import { useFrame, } from "@react-three/fiber";
import { useMemo, useContext, useRef, useState } from "react";
import { InventoryContext } from "../../../../script/state/context/InventoryContext";
import { AppContext } from "../../../../script/state/context/AppContext";
import Goldboard from "@/model/npc/ChartBox/Goldboard";
import { useAI } from "../../../../script/util/hook/useHooksHelper";

export function ResourcesStore ({state, calls, store}:any) {
  const app:any = useContext(AppContext)
  const inv = useContext(InventoryContext)
  const triggerUseItem = (e:any,shopItemData:any, index:number) => {
    if (prompt(`Confirm the use of ${shopItemData.name} (y/n)`,"y") !== "y")
    {
      e.stopPropagation()
      return    
    }

    let usageParams = prompt("Enter usage params separated by commas")
    if (!usageParams) return

    inv.calls.useInvItem(shopItemData, index)
    e.stopPropagation()
  }
  const triggerBuyItem = (e:any,shopItemData:any, index:number) => {
    // if ()
    if (state.realProfitCount == 0) {
      // return app.alert("error", "Not enough usable energy")
    }

    calls.spliceGoodProfitHistory()


    if (inv.unitsArray.length > 4) {
      app.alert("error", "Full inventory")
      return
    }
    let completeProduct = { 
      type: index,
      name: shopLookupObj[index],
      data: shopItemData
    }
    inv.calls.buyShopItem(completeProduct)
    e.stopPropagation()
  }

  const shopLookupObj = [
    "BillboardShopItem",
    "TableShopItem",
    "TableLandShopItem",
    "TableEquipmentShopItem",
    "TableUpgradeItem",
  ]
  const readyForStore = useMemo(()=>{
    return !!state.tutoStage && state.tutoStage?.lvl > 4
  },[state.tutoStage])
  const readyForChange = useMemo(()=>{
    return !!state.tutoStage && state.tutoStage?.lvl > 9
  },[state.tutoStage])
  const triggerTouchGrass = ()=>{
    if (!readyForStore) return

    alert("Resources Store Coming Soon...")
  }
  const [isShopOpen, s__isShopOpen] = useState(false)
  const $shopItems: any = useRef()
  const speedRate = 0.05
  useFrame((ctx, delta) => {
    if (!$shopItems.current) return

    if (isShopOpen) {
      if ($shopItems.current.position.z < 1.3) {
        $shopItems.current.position.z += speedRate
        // $shopItems.current.scale.z = $shopItems.current.position.z 
      } else if ($shopItems.current.position.z > 1.3 ) {
        $shopItems.current.position.z = 1.3
        // $shopItems.current.scale.z = $shopItems.current.position.z 
      }
      setYPos()
      } else {
      
      if ($shopItems.current.position.z > 0) {
        $shopItems.current.position.z -= speedRate
        // $shopItems.current.scale.z = $shopItems.current.position.z 
        setYPos()
      } else if ($shopItems.current.position.z < 0) {
        $shopItems.current.position.z = 0
        // $shopItems.current.scale.z = $shopItems.current.position.z 
        setYPos()
      }
    }
})
  const defaultShopItems = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ]
  const [theBoxesPosArray, s__theBoxesPosArray] = useState(defaultShopItems)
  const setYPos = ()=>{
    $shopItems.current.position.y = Math.sin(Date.now() / 500) / 50 + 0.25
  }

  const ask_angelInvestorSimulator = useAI(state.timeframe,true)
  const triggerAI = (e:any,data:any) => {
    ask_angelInvestorSimulator(data)
    e.stopPropagation()
  }

  const hasAtleastABillboard = useMemo(()=>{
    console.log("hasAtleastABillboard")
    if (inv.usedUnitsArray.length == 0) return

    let billboardIndex = inv.usedUnitsArray.findIndex((invUnit:any,index:number) => {
      return invUnit.type == 0
    })
    console.log("billboardIndex", billboardIndex)
    return billboardIndex != -1
  },[inv.usedUnitsArray])

  const triggerOpenStore = (e:any) => {
     s__isShopOpen(!isShopOpen);
    app.audio("neutral","./sfx/slack2.wav")
    e.stopPropagation() 
  }

  return (<>
    {readyForStore && <>
      <group position={[0,-1.2,0]}>
        <Cylinder args={[3.5,3.5,.1,state.tutoStage?.lvl]} castShadow receiveShadow>
          <meshStandardMaterial color={readyForChange ? "#84BC4E" : "#fff"}/>

        </Cylinder>
      </group>
      <group position={[0,-1.2,-1.2]}>

        <group position={[0,0,0]}>
          <group position={[0,0,0.8]} onClick={(e)=>{triggerOpenStore(e)}}>
            <Box args={[0.5,0.45,0.85]} position={[-2.1,0.25,-0.5]} castShadow receiveShadow>
              <meshStandardMaterial color={"#aaaaaa"}/>
            </Box>
            <Box args={[0.5,0.55,0.5]} position={[-2,0.3,0]} castShadow receiveShadow>
              <meshStandardMaterial color={"#bbbbbb"}/>
            </Box>
            <Box args={[0.2,0.3,0.05]} position={[-2,0.2,0.23]} castShadow receiveShadow>
              <meshStandardMaterial color={"#555555"}/>
            </Box>
            <Box args={[0.4,0.05,0.2]} position={[-2,0.48,0.28]} castShadow receiveShadow rotation={[!isShopOpen ? 0 : 0.4,0,0]}>
              <meshStandardMaterial color={!isShopOpen ? "#999":"#f00"}/>
            </Box>
          </group >
          {/* SHOP ITEMS */}
          <group position={[-1.95,0.1,0]} ref={$shopItems} scale={[1,1,1]}>
            {theBoxesPosArray.map((aShopItemPos:any,index:number)=>{
              return (<>
                <group position={[0,0,index*0.22]} onDoubleClick={(e)=>{ triggerBuyItem(e,{},index) }} key={index}>
                  {index == 0 && <BillboardShopItem /> }
                  {index == 1 && <TableShopItem /> }
                  {index == 2 && <TableLandShopItem /> }
                  {index == 3 && <TableEquipmentShopItem /> }
                  {index == 4 && <TableUpgradeItem /> }
                </group>
                
              </>)
            })}
            
          </group>
        </group>
          <group position={[0.4,0.75,-0.4]}  scale={[1,1,1]}>
            {inv.unitsArray.map((aShopItem:any,index:number)=>{
              return (<>
                <group position={[0,0.1,-index*0.2]} rotation={[0,-Math.PI/2,0]} key={index} onDoubleClick={(e)=>{ triggerUseItem(e,aShopItem,index) }}>
                  {aShopItem.type == 0 && <BillboardShopItem /> }
                  {aShopItem.type == 1 && <TableShopItem /> }
                  {aShopItem.type == 2 && <TableLandShopItem /> }
                  {aShopItem.type == 3 && <TableEquipmentShopItem /> }
                  {aShopItem.type == 4 && <TableUpgradeItem /> }
                </group>
              </>)
            })}
            
          </group>

      </group>
    </>}





  {!!store && state.hasAnyToken && !!state.tutoStage && state.tutoStage?.lvl > 3 && hasAtleastABillboard &&
  <>
      <group scale={[0.4,0.4,0.4]}  position={[-1.25,0,-0.7]} rotation={[0,Math.PI/2,0]}>
        <Goldboard boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={state.timeframe.toLowerCase() || "1d"}
          position={[0,0,0]} velocityX={0}  theToken={state.token}
          askAI={(e:any,data:any)=>{ triggerAI(e,data) }}
          velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos:state.chartBoxPos, s__chartBoxPos:calls.s__chartBoxPos}}
          tokensArrayObj={store}
        />
      </group>
    </>}





  </>)
}

export const BillboardShopItem = () => {
  return (
    <group>
    <Box args={[0.02,0.2,0.02]}  castShadow receiveShadow position={[-0.02,-0.05,0.04]}>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
      <Box args={[0.02,0.2,0.02]}  castShadow receiveShadow position={[-0.02,-0.05,-0.04]}>
        <meshStandardMaterial color={"#ccc"}/>
      </Box>
      <Box args={[0.03,0.25,0.18]}  castShadow receiveShadow position={[0,0.05,0]}>
        <meshStandardMaterial color={"#aaa"}/>
      </Box>
    </group>
  )
}

export const TableShopItem = () => {
  return (
    <group>
    <Box args={[0.02,0.1,0.02]}  castShadow receiveShadow position={[-0.04,-0.1,0.04]}>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
      <Box args={[0.02,0.1,0.02]}  castShadow receiveShadow position={[-0.04,-0.1,-0.04]}>
        <meshStandardMaterial color={"#ccc"}/>
      </Box>
    <Box args={[0.02,0.1,0.02]}  castShadow receiveShadow position={[0.04,-0.1,0.04]}>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
      <Box args={[0.02,0.1,0.02]}  castShadow receiveShadow position={[0.04,-0.1,-0.04]}>
        <meshStandardMaterial color={"#ccc"}/>
      </Box>
      <Box args={[0.15,0.03,0.15]}  castShadow receiveShadow position={[0,-0.055,0]}>
        <meshStandardMaterial color={"#965626"}/>
      </Box>
    </group>
  )
}

export const TableLandShopItem = () => {
  return (
    <Box args={[0.15,0.05,0.15]}  castShadow receiveShadow>
      <meshStandardMaterial color={"#84BC4E"}/>
    </Box>
  )
}

export const TableEquipmentShopItem = () => {
  return (
    <Torus args={[0.05,0.03,4,6]}  castShadow receiveShadow rotation={[0,Math.PI/2,0]}>
      <meshStandardMaterial color={"#f0f"}/>
    </Torus>
  )
}

export const TableUpgradeItem = () => {
  return (
    <group rotation={[0,-0.25,0]}>
      <Box args={[0.05,0.06,0.2]}  castShadow receiveShadow position={[0,0.1,0]}>
        <meshStandardMaterial color={"#ff9900"}/>
      </Box>
      <Box args={[0.04,0.2,0.06]}  castShadow receiveShadow position={[0,0.1,0]}>
        <meshStandardMaterial color={"#ff9900"}/>
      </Box>
    </group>
  )
}
