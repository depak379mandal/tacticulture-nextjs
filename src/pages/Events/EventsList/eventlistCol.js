import React from "react"
import { Badge } from "reactstrap"

const Name = cell => {
  console.log(cell, "fghnfdkjg")
  return cell.value ? cell.value : ""
}

const PublishStatus = cell => {
  switch (cell.value) {
    case true:
      return <Badge className="bg-success">Active</Badge>
    case false:
      return <Badge className="bg-danger">Inactive</Badge>
  }
}

export { Name, PublishStatus }
