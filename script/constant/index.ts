

// Upload Error: \n 
export const API_INVALID_IMAGE_ALREADY_LOADING = "Please wait for the current image to be uploaded"
// File Size Error: \n 
export const API_INVALID_IMAGE_MAXSIZE = "Size of image is larger than the maximum!"
// Image Type/Extension Error: \n 
export const API_INVALID_IMAGE_FILETYPE = "Wrong Image Type or Extension!"
// File Type Error: \n 
export const API_INVALID_IMAGE_CORRUPT = "Corrupt image or file"
// Duplication Error: \n 
export const API_INVALID_IMAGE_DUPLICATE = "This image has already been assigned!"

// Document Type/Extension Error: \n 
export const API_INVALID_DOC_FILETYPE = "Wrong Document Type or Extension!"


export const GRANTS = {
  CANCRUD: {"crud": "create read update delete"},
  CANREAD: {"read": "read"},
  CANIMAGE: {"image": "create read update delete image"},
}

export const GRANTTREE:any = {
  "sp": {
    "root": {
      "unit": {
        ...GRANTS.CANCRUD,
      },
      "agreement": {
      },
    }
  },
  "ims": {
    "root": {
      "unit": {
        ...GRANTS.CANCRUD,
        ...GRANTS.CANIMAGE
      },
    }
  },
  "supa": {
    "root": {
    }
  },
}

export interface IItemLabel {
  id: string;
  label: string;
}
export interface IItemName {
  id: string;
  name: string;
}
export const DEFAULT_ALERT_MAPARRAY:any = [["error",""],["warn",""],["wait",""],["success",""],["neutral",""]]


export const USERS_DB = {
  "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
  "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
}

// export const USERS_DB = {
//   "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
//   "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
// }

export const FAKE_UNIT_FOREIGNS = {
  sales_statuses: [
    {id:"1", label: "Available"},
    {id:"2", label: "Rented"},
    {id:"3", label: "Sold"},
    {id:"4", label: "Not Available"},
  ],
  customersArray: [],
  orgsArray: [],
  dealers: [],
}

export const INSTITUTION = {
  title: "ServicePad",
  email: "support@servicepad.com",
  titleSupport: "ServicePad Customer Support:",
  copyrights: "© 2022 ServicePad, Inc. All rights reserved.",
}