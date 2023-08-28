"use client"
import React, { useEffect, useState, useRef, useMemo } from "react"
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
import API_URL from "../../../helpers/api_helper"

import { FirstName, LastName, Email, IsActive, Id } from "./userlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getAllUser, deleteUser } from "store/user/action"

//redux
import { useSelector, useDispatch } from "react-redux"
import DeleteModal from "pages/Calendar/DeleteModal"
import Link from "next/link"

const UsersList = props => {
  //meta title
  document.title = "User List | Tacticulture Admin"

  const dispatch = useDispatch()

  const { users, next, previous } = useSelector(state => ({
    users: state.User.user,
    next: state.User.next,
    previous: state.User.prev,
  }))
  useEffect(() => {
    const nextURL = next && next.split(API_URL)[1]
    dispatch(getAllUser(nextURL || null))
  }, [dispatch])

  const nextPrevFunc = text => {
    if (text == "next") {
      dispatch(getAllUser(next))
    } else if (text == "previous") {
      dispatch(getAllUser(previous))
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Img",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.first_name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.profile_image}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "FirstName",
        accessor: "first_name",
        filterable: true,
        Cell: cellProps => {
          return <FirstName {...cellProps} />
        },
      },
      {
        Header: "LastName",
        accessor: "last_name",
        filterable: true,
        Cell: cellProps => {
          return <LastName {...cellProps} />
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Active Status",
        accessor: "is_active",
        disableFilters: true,
        Cell: cellProps => {
          return <IsActive {...cellProps} />
        },
      },

      {
        Header: "Action",
        accessor: "id",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link
                  href={`/view-user/${cellProps.value}`}
                  className="btn btn-sm btn-soft-primary"
                >
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  href={`/update-user/${cellProps.value}`}
                  className="btn btn-sm btn-soft-info"
                // onClick={() => {
                //   const jobData = cellProps.row.original
                //   handleJobClick(jobData)
                // }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const id = cellProps.value
                    onClickDelete(id)
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
  const handleUserClicks = () => {
    navigate("/add-user")
  }
  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState();

  const onClickDelete = (id) => {
    console.log(id, "===========================")
    setUserId(id);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    console.log("usererrrrrr--", userId)
    if (userId) {
      dispatch(deleteUser(userId));
    }
    setDeleteModal(false);
  };
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
          <Breadcrumbs title="Users" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    isAddEventList={false}
                    handleClick={handleUserClicks}
                    fetchData={() => console.log()}
                    fetchNextData={() => nextPrevFunc("next")}
                    fetchOldData={() => nextPrevFunc("previous")}
                    customPageSize={1}
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

export default withRouter(UsersList)
