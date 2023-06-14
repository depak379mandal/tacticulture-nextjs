import React, { useEffect, useState, useMemo } from "react"
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
  Input,
  Form,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Name, Owner, Img } from "./roadmapCol"
import { getRoadmap } from "store/actions"

const RoadmapList = props => {
  //meta title
  document.title = "Roadmap List | React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const { roadmaps } = useSelector(state => ({
    roadmaps: state.roadmaps.roadmaps,
  }))

  const [roadmapList, setRoadmapList] = useState([])
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
        Header: "Initial",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => {
          return <Img {...cellProps} />
        },
      },
      {
        Header: "Roadmap",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Roadmap Owner",
        accessor: "full_name",
        filterable: true,
        Cell: cellProps => {
          return <Owner {...cellProps} />
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (roadmaps && !roadmaps.length) {
      dispatch(getRoadmap())
      setIsEdit(false)
    }
  }, [dispatch, roadmaps])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClicks = () => {
    setRoadmapList("")
    setIsEdit(false)
    toggle()
  }

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
          <Breadcrumbs title="Roadmap" breadcrumbItem="Roadmap List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={roadmaps}
                    isGlobalFilter={true}
                    isAddUserList={false}
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

export default withRouter(RoadmapList)
