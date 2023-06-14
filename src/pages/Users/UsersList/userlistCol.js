import React from "react"

const FirstName = cell => {
  return cell.value ? cell.value : ""
}

const LastName = cell => {
  return cell.value ? cell.value : ""
}
const Email = cell => {
  return cell.value ? cell.value : ""
}

const IsActive = cell => {
  return cell.value == 1 ? "Active" : "Inactive"
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

export { FirstName, LastName, Email, Img, IsActive }
