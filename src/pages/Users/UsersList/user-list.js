import React, { useEffect, useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "../../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { FirstName, LastName, Email, IsActive } from "./userlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import { getAllUser, getAllUser as onGetUsers } from "store/user/action"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const UsersList = props => {
  //meta title
  document.title = "User List | Tacticulture Admin"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      projects: Yup.string().required("Please Enter Your Project"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        }
        // update user
        dispatch(onUpdateUser(updateUser))
        setIsEdit(false)
        validation.resetForm()
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        }
        // save new user
        dispatch(onAddNewUser(newUser))
        validation.resetForm()
      }
      toggle()
    },
  })
  const handleOrderClick = arg => {
    dispatch(onUpdateUser(arg))
  }
  // const { users } = useSelector(state => ({
  //   users: state.User.user,
  // }))
  // useEffect(() => {
  //   dispatch(getAllUser())
  // }, [])
  const { users, page } = useSelector(state => ({
    users: state.User.user,
    page: state.User.page,
  }))
  // console.log(users, page, "kjhdgkjfdhgkfsdjhgksfdhgskdfgh")
  useEffect(() => {
    dispatch(getAllUser())
  }, [])

  const nextFunc = () => {
    dispatch(getAllUser(page))
  }

  // console.log(users, "userss", page)
  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />
        },
      },
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
                  {/* {cellProps.display_name.charAt(0)} */}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.profile_pic}
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
        Header: "Status",
        // accessor: "status",
        // filterable: true,
        Cell: cellProps => {
          // console.log(cellProps, "propf")
          return (
            <>
              <button onClick={() => handleOrderClick(cellProps)}>
                <div>{cellProps.status ? "Active" : "Inactive"}</div>
              </button>
            </>
          )
        },
      },
      {
        Header: "Action",
        filterable: false,
        Cell: cellProps => {
          return (
            <>
              <button onClick={() => handleOrderClick(cellProps)}>
                <div>{cellProps.status ? "Active" : "Inactive"}</div>
              </button>
              <button onClick={() => handleOrderClick(cellProps)}>
                <div>{cellProps.status ? "Active" : "Inactive"}</div>
              </button>
            </>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

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

  const onClickDelete = users => {
    setContact(users)
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
  const handleUserClicks = () => {
    navigate("/add-user")
  }

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
