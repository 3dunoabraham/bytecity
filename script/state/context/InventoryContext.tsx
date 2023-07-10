import { createContext, useState, Dispatch, SetStateAction } from "react";

type InventoryContextType = {
    calls: any;
    unitsArray: any;
    s__unitsArray: Dispatch<SetStateAction<any>>;
    usedUnitsArray: any;
    s__usedUnitsArray: Dispatch<SetStateAction<any>>;
};

export const InventoryContext = createContext<InventoryContextType>({
    calls: {},
    unitsArray: [],
    s__unitsArray: () => {},
    usedUnitsArray: [],
    s__usedUnitsArray: () => {}
});

export function InventoryProvider({children}:any) {
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
        
        s__usedUnitsArray(currentUsedUnits)
        s__unitsArray(currentUnits)
    }


    return (
        <InventoryContext.Provider
            value={{unitsArray, s__unitsArray, usedUnitsArray, s__usedUnitsArray, calls: { buyShopItem, useInvItem }}}
        >
            {children}
        </InventoryContext.Provider>

    )
}