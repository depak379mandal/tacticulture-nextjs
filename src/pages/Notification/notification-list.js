import React, { useEffect, useState, useRef, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "../../components/Common/TableContainer"
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
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
// import { useFormik } from "formik"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getWorkspace as getWork } from "../../store/workspace/actions"
import { Name, Plan, Owner, Img, Message } from "./notificationlistCol"

const NotificationList = props => {
  //meta title
  document.title = "Workspace List | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  const { notifications } = useSelector(state => ({
    notifications: state.notifications.notification,
  }))

  // const [workspaceList, setWorkSpaceList] = useState([])
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
        Header: "date",
        accessor: "date",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "message",
        accessor: "message",
        filterable: true,
        Cell: cellProps => {
          return <Message {...cellProps} />
        },
      },
    ],
    []
  )

  // useEffect(() => {
  //   if (workspaces && !workspaces.length) {

  //     setIsEdit(false)
  //   }
  // }, [dispatch, notifications])

  // useEffect(() => {
  //   setContact(users)
  //   setIsEdit(false)
  // }, [users])

  // useEffect(() => {
  //   if (!isEmpty(users) && !!isEdit) {
  //     setContact(users)
  //     setIsEdit(false)
  //   }
  // }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  // const handleUserClick = arg => {
  //   const user = arg

  //   setContact({
  //     id: user.id,
  //     name: user.name,
  //     designation: user.designation,
  //     email: user.email,
  //     tags: user.tags,
  //     projects: user.projects,
  //   })
  //   setIsEdit(true)

  //   toggle()
  // }

  // var node = useRef()
  // const onPaginationPageChange = page => {
  //   if (
  //     node &&
  //     node.current &&
  //     node.current.props &&
  //     node.current.props.pagination &&
  //     node.current.props.pagination.options
  //   ) {
  //     node.current.props.pagination.options.onPageChange(page)
  //   }
  // }

  // //delete customer
  // const [deleteModal, setDeleteModal] = useState(false)

  // const onClickDelete = users => {
  //   setContact(users)
  //   setDeleteModal(true)
  // }

  // const handleDeleteUser = () => {
  //   if (contact && contact.id) {
  //     dispatch(onDeleteUser(contact.id))
  //   }
  //   onPaginationPageChange(1)
  //   setDeleteModal(false)
  // }

  const handleUserClicks = () => {
    setWorkSpaceList("")
    setIsEdit(false)
    toggle()
  }

  // const keyField = "id"
  console.log(notifications, "data adsf")
  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="notification"
            breadcrumbItem="Notification List"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={notifications}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    fetchData={() => console.log()}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          // validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Insert Name"
                              />
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Designation</Label>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Option</Label>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Projects</Label>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(NotificationList)
