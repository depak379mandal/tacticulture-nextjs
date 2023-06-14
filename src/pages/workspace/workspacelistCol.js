import React from "react"
import * as moment from "moment"

const formateDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const Owner = cell => {
  return cell.value ? cell.value : ""
}

const Plan = cell => {
  return cell.value ? cell.value : ""
}

const Img = cell => {
  return (
    <>
      <div className="avatar-xs">
        <span className="avatar-title rounded-circle">
          {cell.name.charAt(0)}
        </span>
      </div>
    </>
  )
}

export { Name, Owner, Plan, Img }
