
export const createTradeObject = (x:any, y:any) => {
    return {
      side: !!y.value ? "buy" : "sell",
      token: x,
      price: y.price,
    };
  };
  
  
  export const handleFirstTutorialStages = (isBuying:any, tutoStage:any, setTutoStage:any) => {
    if (!!tutoStage && tutoStage.lvl === 1 && isBuying) {
      setTutoStage(2);
      return 2
    } else if (!!tutoStage && tutoStage.lvl === 2 && !isBuying) {
      setTutoStage(3);
      return 3
    }
    return null
  };
  export const updateProfitHistory = (
    currentOrders: Record<string, any>,
    form: { id: string },
    newTradeObj: { price: number },
    profitHistory: any[],
    feePercent: number
  ): any[] => {
    let oldOrders = { ...currentOrders };
  
    let theindex = profitHistory.length;
    let newprofithi:any = [...profitHistory, [oldOrders[form.id], newTradeObj]];
    let percentChange:any =
      newprofithi.price == oldOrders[form.id].price
        ? 0
        : parseFloat(`${(newTradeObj.price / oldOrders[form.id].price) * 100}`).toFixed(2);
  
    newprofithi[theindex].unshift((percentChange - 100) > feePercent ? "profit" : "loss");
    newprofithi[theindex].unshift((percentChange - 100).toFixed(3));
  
    return newprofithi;
  };
  
  // export const handleSellSide = (
  //   newTradeObj: { price: number },
  //   form: { id: string },
  //   projectionMode: boolean,
  //   app: any,
  //   projectVirtualOrder: (id: string, tradeObj: { price: number }) => void
  // ): any => {

  //     projectVirtualOrder(form.id, newTradeObj);
  // };
  
  export const countProfitableTrades = (newprofithi: any[]): number => {
    let counting = newprofithi.filter((atrade) => atrade[1] == "profit").length;
    return counting;
  };

  
  