
export async function fetchMultipleJsonArray(requestsObj:any) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey) => {
      return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray) => {
      return Promise.all(reqKeys.map((r,index) => responsesArray[index].json()))
    })
  }
export const parseDecimals = (x:number) => {
    x = parseFloat(`${x}`)
      if (x == 0) return 0
      if (x < 0.000001)
      {
        return 0
      }
      if (x < 0.00001)
      {
        return x.toFixed(8)
      }
      if (x < 0.0001)
      {
        return x.toFixed(7)
      }
      if (x < 0.001)
      {
        return x.toFixed(6)
      }
      if (x < 0.01)
      {
        return x.toFixed(5)
      }
      if (x < 0.1)
      {
        return x.toFixed(4)
      }
      if (x < 1)
      {
        return x.toFixed(3)
      }
      if (x < 50)
      {
        return x.toFixed(2)
      }
      if (x < 100)
      {
        return x.toFixed(1)
      }
      return parseInt(`${x}`)
    };

    
export const getComputedLevels = (config:any)=> {
    let minMaxAvg = (parseFloat(config.ceil)+parseFloat(config.floor))/2
    let minMedian = (parseFloat(config.floor)+parseFloat(`${minMaxAvg}`))/2
    let maxMedian = (parseFloat(config.ceil)+parseFloat(`${minMaxAvg}`))/2
  
    let theLevels = {
      floor: parseFloat(`${parseDecimals(config.floor)}`),
      ceil: parseFloat(`${parseDecimals(config.ceil)}`),
      min: parseFloat(`${parseDecimals(config.floor)}`),
      max: parseFloat(`${parseDecimals(config.ceil)}`),
      minMedian: parseFloat(`${parseDecimals(minMedian)}`),
      maxMedian: parseFloat(`${parseDecimals(maxMedian)}`),
      minMaxAvg: parseFloat(`${parseDecimals(minMaxAvg)}`),
    }
  
    return theLevels
  }

  export function getBrowserTimeIn5Minutes(): string {
    // Get the current date and time.
    const now = new Date();
  
    // Get the hour and minute from the current date and time.
    let hour = now.getHours();
    let minute = now.getMinutes();
  
    // Calculate the time in 5 minutes.
    let minutesIn5Minutes = minute + 5;
  
    // If the minutes are greater than 59, then add 1 to the hour.
    if (minutesIn5Minutes > 59) {
      hour += 1;
      minutesIn5Minutes -= 60;
    }
  
  // Return the hour and minute in a string, padded with zeros to the left of the minute.
  const paddedMinute = String(minutesIn5Minutes).padStart(2, '0');
  return `${hour}:${paddedMinute}`;
}

  