import { createContext, useState, Dispatch, SetStateAction } from "react";

type InventoryContextType = {
    unitsArray: never[];
    s__unitsArray: Dispatch<SetStateAction<never[]>>;
};

export const InventoryContext = createContext<InventoryContextType>({
    unitsArray: [],
    s__unitsArray: () => {}
});

export function InventoryProvider({children}:any) {
    const [unitsArray, s__unitsArray] = useState([])

    return (
        <InventoryContext.Provider
            value={{unitsArray, s__unitsArray}}
        >
            {children}
        </InventoryContext.Provider>

    )
}