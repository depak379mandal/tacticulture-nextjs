import React from "react"

import { Card, CardBody, Col, Row, Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "store/user/action"

const ViewUser = () => {
  //meta title
  document.title = "View User | Tacticulture Admin"

  const dispatch = useDispatch()

  const { id } = useParams()
  const { user } = useSelector(state => ({
    user: state.User.userDetail,
  }))
  useEffect(() => {
    dispatch(getUserDetails(id))
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="View User Details" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      FirstName :
                    </label>
                    <div className="col-md-10">{user?.first_name}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-search-input"
                      className="col-md-2 col-form-label"
                    >
                      LastName
                    </label>
                    <div className="col-md-10">{user?.last_name}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-email-input"
                      className="col-md-2 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-10">{user?.email}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-url-input"
                      className="col-md-2 col-form-label"
                    >
                      Username
                    </label>
                    <div className="col-md-10">{user?.username}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-tel-input"
                      className="col-md-2 col-form-label"
                    >
                      Telephone
                    </label>
                    <div className="col-md-10">{user?.phone_number}</div>
                  </Row>

                  <Row className="mb-3">
                    <label className="col-md-2 col-form-label">
                      Default Role
                    </label>
                    <div className="col-md-10">{user?.default_profile}</div>
                  </Row>
                  <Row className="mb-3">
                    <label className="col-md-2 col-form-label">
                      Profile Image
                    </label>
                    <div className="col-md-10">profile img will show later</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-md-10">{user?.address}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      City
                    </label>
                    <div className="col-md-10">{user?.city}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      ZipCode
                    </label>
                    <div className="col-md-10">{user?.zip_code}</div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Bio
                    </label>
                    <div className="col-md-10">{user?.bio}</div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ViewUser
