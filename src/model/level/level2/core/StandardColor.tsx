
export function StandardColor ({color = "#ffffff"}:{color?:string}) {
  return (
    <meshStandardMaterial color={color} />
  )
}

export default StandardColor