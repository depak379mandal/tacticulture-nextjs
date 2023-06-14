import React, { useEffect, useState, useRef, useMemo } from "react"
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

import { getEvent as onGetEvents } from "store/events/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getEvent } from "store/actions"
import { Status } from "pages/Crypto/CryptoOrders/CryptoCol"

const EventList = props => {
  //meta title
  document.title = "Event List | Tacticulture Admin"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  const { events } = useSelector(state => ({
    events: state.Event.event,
  }))
  useEffect(() => {
    dispatch(getEvent())
  }, [])

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

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

  useEffect(() => {
    if (events && !events.length) {
      dispatch(onGetEvents())
      setIsEdit(false)
    }
  }, [dispatch, events])

  useEffect(() => {
    setContact(events)
    setIsEdit(false)
  }, [events])

  useEffect(() => {
    if (!isEmpty(events) && !!isEdit) {
      setContact(events)
      setIsEdit(false)
    }
  }, [events])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = events => {
    setContact(events)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id))
    }
    onPaginationPageChange(1)
    setDeleteModal(false)
  }
  const navigate = useNavigate()
  const handleEventClicks = () => {
    // setUserList("")
    // setIsEdit(false)
    // toggle()
    navigate("/add-event")
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
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
