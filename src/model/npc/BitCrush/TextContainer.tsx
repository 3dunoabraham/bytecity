import DynaText from "@/model/core/DynaText"
import OppoTitle from "./label/OppoTitle"

export function TextContainer ({state, calls}:any) {
  return (
    <>
    <OppoTitle {...{state, calls}} />

    </>
  )
}
export default TextContainer