export const isValidImgExt = (theType:any, theExt:any)=>{
    return (
      ["JPG","JPEG","PNG","GIF"].indexOf(theType.toUpperCase()) != -1 &&
      [".JPG",".JPEG",".PNG",".GIF"].indexOf(theExt.toUpperCase()) != -1
    )
  }
  export const filename2Type = (theString:any)=>{
    return theString.replace(/(.*)\//g, '')
  }
  export const filename2Extension = (theString:any)=>{
    return theString.match(/\.[0-9a-z]+$/i)[0]
  }
  export const isValidDocExt = (theExt:any)=>{
    return (
      [
        ".DOC",".DOCX",".DOCM",".TXT",".PDF",".PPT",".PPTX",".PPTM",
        ".XLS",".XLSM",".XLSX",".CSV",
        ".ODT",".ODF",".ODS",".ODG",
        ".MD",".PS",".OXPS",".XPS",
        ".TXT",".ZIP",".7Z",".TAR",".GZ",
      ].indexOf(theExt.toUpperCase()) != -1
    )
  }
  // export const incInLowerCase = (subString,theString)=>{
  //     return (`${subString}`.toLowerCase() === theString.toLowerCase())
  // }
  export const isIncInLowerCase = (subString:any,theString:any)=>{
    return (`${subString}`.toLowerCase().includes(`${theString}`.toLowerCase()))
  }
  export const isEqInLowerCase = (subString:any,theString:any)=>{
    return (`${subString}`.toLowerCase() === `${theString}`.toLowerCase())
  }
  export const isStrInteger = (value:any)=>{
  return /^\d+$/.test(value);
  }
  export const firstUpperCase = (theString:any) =>{
    return theString.charAt(0).toUpperCase() + theString.slice(1)
  }
  
  export const jstr2FullName = (fullNameJson:string)=>{
  if (fullNameJson == "None") return fullNameJson
  const theObj = JSON.parse(fullNameJson.replace(/'/g, '"'))
  return fullNameJson == "None" ? fullNameJson : `${theObj.first_name} ${theObj.last_name}`
  }
  // inspired by clsx built by gugaguichard
  export type JSS = (...a: Array<undefined | null | string | boolean>) => string
  export const jss: JSS = (...args) =>
  args
    .flat()
    .filter(x => 
        x !== null && x !== undefined && typeof x !== 'boolean'
    ).join(' ')
  
  
  export const jssWSwitch = (ref:any, sequence:any, widths:any) =>{
    let arrayOfArgs: string[] = []
    const length = sequence.length
    const widthsLength = widths.length
    for (var i = 0; i < length; ++i)
    {
        if (ref == sequence[i]) arrayOfArgs.push(` w-max-${widths[i]}px `)
    }
    return jss(...arrayOfArgs)
  }
  
  export const getOcurrences = (temp:any,match:any) =>{
    var regex = new RegExp( match, 'g' );
    return (temp.match(regex) || []).length
  }
  
  
  
  // export const parseStrSingleQt = (theObj) =>
  // {
  //     return JSON.stringify(theObj).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")
  // }
  // export const parseJsonSingleQt = (fullNameJson:string)=>{
  //     return JSON.parse(fullNameJson.replace(/'/g, '"'))
  // }
  // export const parseJsonSingleQtFixNone = (fullNameJson:string)=>{
  //     let theReplacedString = fullNameJson.replace(/'/g, '"').replace('None','"None"')
  //     return JSON.parse(theReplacedString)
  // }