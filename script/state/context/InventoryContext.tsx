import { createContext, useState, Dispatch, SetStateAction, useMemo } from "react";

type InventoryContextType = {
    calls: any;
    memo: any;
    unitsArray: any;
    s__unitsArray: Dispatch<SetStateAction<any>>;
    usedUnitsArray: any;
    s__usedUnitsArray: Dispatch<SetStateAction<any>>;
    buildZoneObj: any;
    s__buildZoneObj: Dispatch<SetStateAction<any>>;
};

export const InventoryContext = createContext<InventoryContextType>({
    memo: {},
    calls: {},
    unitsArray: [],
    s__unitsArray: () => {},
    usedUnitsArray: [],
    s__usedUnitsArray: () => {},
    buildZoneObj: {},
    s__buildZoneObj: () => {},
});

export function InventoryProvider({children}:any) {
    const [availTables, s__availTables] = useState(0)
    const [buildZoneObj, s__buildZoneObj] = useState({})
    const [unitsArray, s__unitsArray] = useState([])
    const [usedUnitsArray, s__usedUnitsArray] = useState([])

    const buyShopItem = (shopItem:any) => {
        let currentUnits:any = [...unitsArray,shopItem]
        s__unitsArray(currentUnits)
    }
    const useInvItem = (shopItem:any, index:any) => {
        let selectedItem = unitsArray[index]
        try {
            
            if (JSON.stringify(shopItem) != JSON.stringify(selectedItem)) {
                return console.error("item not match")            
            }
        } catch (error) {
            return console.error("baddddd errrrorrrr")            
        }

        let currentUnits:any = [...unitsArray]
        currentUnits.splice(index, 1)

        let currentUsedUnits:any = [...usedUnitsArray, shopItem]
        // console.log("shopItem", shopItem)

        s__unitsArray(currentUnits)

        if (shopItem.name == "TableShopItem") {
            // let newGrowZone = prompt("Type y")
            alert("Click on the available pieze of land to place your table")
            s__availTables(availTables+1)
            return
        }

        s__usedUnitsArray(currentUsedUnits)

    }
    const DEFAULT_ZONE_OBJ = {}
    const makeAZone = (zoneData:any) => {
        // console.log("zoneData", zoneData)
        if (!availTables) { return }

        s__availTables(availTables-1)
        // if (!zoneData.name) {
        //     return
        // }
        s__buildZoneObj({...buildZoneObj, [zoneData.index]: DEFAULT_ZONE_OBJ})
    }

    // const checkInv_tables = useMemo(()=>{
    //     return availTables
    //     // let tableCount = usedUnitsArray.filter((invUnit:any)=>{
    //     //     return invUnit.type == 1
    //     // })

    //     // return tableCount
    // },[availTables])


    return (
        <InventoryContext.Provider
            value={{unitsArray, s__unitsArray,
                usedUnitsArray, s__usedUnitsArray,
                buildZoneObj, s__buildZoneObj,
                memo: {
                    checkInv_tables: availTables
                },
                calls: { buyShopItem, useInvItem, makeAZone }
            }}
        >
            {children}
        </InventoryContext.Provider>

    )
}