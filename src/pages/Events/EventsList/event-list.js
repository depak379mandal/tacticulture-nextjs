import React, { useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "../../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"

import { Name, PublishStatus } from "./eventlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getEvent } from "store/actions"
import API_URL from "helpers/api_helper"

const EventList = props => {
  //meta title
  document.title = "Event List | Tacticulture Admin"

  const dispatch = useDispatch()
  const { events, next, previous } = useSelector(state => ({
    events: state.Event.event,
    next: state.Event.next,
    previous: state.Event.prev,
  }))

  useEffect(() => {
    const nextURL = next && next.split(API_URL)[1]
    dispatch(getEvent(nextURL || null))
  }, [dispatch])

  const nextPrevFunc = text => {
    if (text == "next") {
      dispatch(getEvent(next))
    } else if (text == "previous") {
      dispatch(getEvent(previous))
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Publish Status",
        accessor: "publish_status",
        disableFilters: true,
        Cell: cellProps => {
          return <PublishStatus {...cellProps} />
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original
                    handleJobClick(jobData)
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original
                    onClickDelete(jobData)
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          )
        },
      },
    ],
    []
  )

  const navigate = useNavigate()
  const handleEventClicks = () => {
    navigate("/add-event")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Events" breadcrumbItem="Event List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={events}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    isAddEventList={true}
                    handleClick={handleEventClicks}
                    fetchData={() => console.log()}
                    fetchNextData={() => nextPrevFunc("next")}
                    fetchOldData={() => nextPrevFunc("previous")}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(EventList)
