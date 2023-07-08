import { createContext, useState, Dispatch, SetStateAction } from "react";

type InventoryContextType = {
    calls: any;
    unitsArray: any;
    s__unitsArray: Dispatch<SetStateAction<any>>;
};

export const InventoryContext = createContext<InventoryContextType>({
    calls: {},
    unitsArray: [],
    s__unitsArray: () => {}
});

export function InventoryProvider({children}:any) {
    const [unitsArray, s__unitsArray] = useState([])

    const buyShopItem = (shopItem:any) => {
        // alert("")
        console.log("shopItem")
        console.log(shopItem)
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
        // alert("")
        console.log("shopItem")
        console.log(shopItem)
        let currentUnits:any = [...unitsArray]
        currentUnits.splice(index, 1)
        s__unitsArray(currentUnits)
    }


    return (
        <InventoryContext.Provider
            value={{unitsArray, s__unitsArray, calls: { buyShopItem, useInvItem }}}
        >
            {children}
        </InventoryContext.Provider>

    )
}