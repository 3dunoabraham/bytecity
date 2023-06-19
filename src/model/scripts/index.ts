
export const createTradeObject = (x:any, y:any) => {
    return {
      side: !!y.value ? "buy" : "sell",
      token: x,
      price: y.price,
    };
  };
  
  
  export const handleFirstTutorialStages = (isBuying:any, tutoStage:any, callback:any) => {
    if (tutoStage.lvl === 1 && isBuying) {
      callback(2);
    } else if (tutoStage.lvl === 2 && !isBuying) {
      callback(3);
    }
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
  
  export const handleSellSide = (
    newTradeObj: { price: number },
    form: { id: string },
    projectionMode: boolean,
    app: any,
    s__profitHistory: (arg1:any)=>void,
    projectVirtualOrder: (id: string, tradeObj: { price: number }) => void
  ): any => {
    if (!!projectionMode) {
      projectVirtualOrder(form.id, newTradeObj);
      app.alert("success", "Sending SELL order with synced API keys");
    }
  
    return s__profitHistory;
  };
  
  export const countProfitableTrades = (newprofithi: any[]): number => {
    let counting = newprofithi.filter((atrade) => atrade[1] == "profit").length;
    return counting;
  };

  
  