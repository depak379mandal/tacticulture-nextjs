import React from "react"
import { Badge } from "reactstrap"

const Id = cell => {
  console.log({ cell })
  return cell.value ? cell.value : ""
}

const FirstName = cell => {
  return cell.value ? cell.value : ""
}

const LastName = cell => {
  return cell.value ? cell.value : ""
}
const Email = cell => {
  return cell.value ? cell.value : ""
}

// const IsActive = cell => {
//   return cell.value == 1 ? "Active" : "Inactive"
// }

const IsActive = cell => {
  switch (cell.value) {
    case true:
      return <Badge className="bg-success">Active</Badge>
    case false:
      return <Badge className="bg-danger">Inactive</Badge>
  }
}

const Img = cell => {
  return (
    <>
      {!cell.value ? (
        <div className="avatar-xs">
          <span className="avatar-title rounded-circle">
            {cell.data[0].name.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <img className="rounded-circle avatar-xs" src={cell.value} alt="" />
        </div>
      )}
    </>
  )
}

export { Id, FirstName, LastName, Email, Img, IsActive }
