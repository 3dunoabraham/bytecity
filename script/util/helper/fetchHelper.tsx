import { isStrInteger, jstr2FullName } from '@/../script/util/type/stringHelper';


export const DEFAULT_UNIT_FOREIGNS:any = { sales_statuses: [], customersArray: [], orgsArray: [], dealers: [] }

export const fetchDelete = async (url:any,body = {})=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'DELETE',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        console.error(err)
        return err
    }
}
export async function PostData(url = '', data = {}, method = "POST") {
    try {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method,
            body: JSON.stringify(data),
        });
        const ress = await response;
        return ress
    } catch (err) {
        console.error(err)
        return err
    }
}
export const fetchPut = async (url:any,body:any)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'PUT',body:JSON.stringify(body)
        })
        return await fetchRes
    } catch (err) {
        console.error(err)
        return err
    }
}
export const fetchGet = async (url:any,body={})=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'PUT',body:JSON.stringify(body)
        })
        return await fetchRes
    } catch (err) {
        console.error(err)
        return err
    }
}
export const fetchPost = async (url:any,body:any)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'POST',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        console.error(err)
        return err
    }
}
export async function fetchPostWjwt (url:any,body:any,jwt:any) {
  try {
    const reqRes = await fetch(url,{
      headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
        body:JSON.stringify(body)
      },
    })
    let awaitedRes = (await reqRes.clone().json())
    return awaitedRes
  } catch (e:any) {
    return e
  }
}
export const fetchPostImage = async (url:any,file:any,config:any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const payload = new FormData();
            payload.append(config.fieldName || "img", file, file.name);

            const req = new XMLHttpRequest();
            req.open('POST', url);
            req.setRequestHeader("Authorization", `Bearer ${config.jwt}`);

            req.onreadystatechange = config.onReady
            req.upload.addEventListener('progress', config.onProgress)
            resolve({req,payload})
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
export function returnError(_a:any,err:any,theUrl:any,returnNull = false) {
    // console.log("error fetching: "+theUrl,err)
    return returnNull ? null : _a
}
export async function fetchJsonArray(theUrl:any, propName = "", returnNull = false) {
    try {
        let theRequest = await fetch(theUrl);
        let headerCType = theRequest.headers.get("content-type");
        if (!headerCType) return returnError([],{err:"contentType"},theUrl,returnNull)
        let succesfullJsonResponse = headerCType.includes("application/json")
        if (!succesfullJsonResponse) return returnError([],{err:"json"},theUrl,returnNull)
        let theJsonResult = await theRequest.json()
        let theParsedResult = propName == "" ? theJsonResult : theJsonResult[propName]
        if (propName != "" && !(propName in theJsonResult)) { return returnError([],{},theUrl,returnNull) }
        return theParsedResult
    } catch (err) {
        return returnNull ? null : returnError([],err,theUrl,returnNull)
    }
}
export async function fetchMultipleJsonArray(requestsObj:any) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey)=>{
        return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray)=>{
        return Promise.all(reqKeys.map((r,index) =>
            responsesArray[index].json()
        ))
    })
}
export async function fetchDownload(url:any, filename:any) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
}

export const fetchShopifyProducts = async function () {
    const response = await fetch('https://dunowhy.myshopify.com/admin/api/2023-01/products.json', {
    headers: { 'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
    }});
    const products = await response.json();
    return { datas: { products: products.products, local: [] } };
}


export const parseArray = (_obj:any)=>{
    return _obj && Array.isArray(_obj) ? _obj : []
}

export function parseNoteObj(aNoteString:any,id:any) {
    let splittedString = aNoteString.split(" ")
    let [date,time,created_by,...rest] = splittedString
    return {
        created_at: date,
        created_by: created_by.split(":")[0],
        id: id,
        is_active: 'false',
        is_verified: 'false',
        text: rest.join(" "),
        units: '',
        updated_at: 'null',
        updated_by: 'null',
    }
}
export function parsedFetchedUnit(aUnit:any, orgsArray:any, customersArray:any) {
    let aParsedUnit = {...aUnit, ...{location: `-`}}
    if (aUnit.location_related == 0) return aParsedUnit 
    if (aUnit.location_related == 1)
    {
        let theFoundOrg = orgsArray.filter((aOrg:any, index:any)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundOrg.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundOrg[0].name}}
    }
    if (aUnit.location_related == 2)
    {
        let theFoundCustomer = customersArray.filter((aOrg:any, index:any)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundCustomer.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundCustomer[0]._name}}
    }
    return aParsedUnit 
}

export function parseChangedDataObj(changedData:any) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) return
            the_data[key] = the_data.investors[key] || null
        })
        delete the_data["investors"]
    }
    return the_data
}
export function parseChangedDataToAddObj(changedData:any) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        !the_data.investors[key] ||
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) {
                return
            }
            the_data[key] = the_data.investors[key]
        })
        delete the_data["investors"]
    }
    return the_data
}
export function parseOrgTypeList(type:any, _orgsList:any, DEFAULT_ORG_TYPE_LIST:any) {
    if (type == "owner")
    {
        return _orgsList.filter((item:any,index:any)=> {return parseInt(item.type) <= 6 })
    }
    let orgTypeId  = DEFAULT_ORG_TYPE_LIST.filter((orgOptType:any)=>orgOptType.label == type)
    if (!orgTypeId.length) return []
    let returnList = _orgsList.filter((item:any,index:any)=> {
        return item.type == orgTypeId[0].id
    })
    return returnList
}