import { MeshStandardMaterial } from "three"

export function StandardColor (color:string,...props:any) {
  return new MeshStandardMaterial({...props,...{color}})
}

export default StandardColor