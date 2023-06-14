import * as moment from "moment"

const formateDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}

const Name = cell => {
  return cell.value ? formateDate(cell.value) : ""
}

const Message = cell => {
  return cell.value ? cell.value : ""
}

export { Name, Message }
