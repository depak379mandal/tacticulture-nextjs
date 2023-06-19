import React, { useEffect } from "react"

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { getUserDetails, updateUserDetail } from "store/actions"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"

const UpdateUser = () => {
  //meta title
  document.title = "Update User | Tacticulture Admin"
  const dispatch = useDispatch()

  const { id } = useParams()
  const { user } = useSelector(state => ({
    user: state.User.userDetail,
  }))
  useEffect(() => {
    dispatch(getUserDetails(id))
  }, [dispatch])

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: "",
      last_name: "",
      email: user?.email,
      username: "",
      phone_number: "",
      default_profile: user?.default_profile,
      password: "",
      address: "",
      city: "",
      profile_image: "",
      zip_code: "",
      bio: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string(),
      last_name: Yup.string(),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      username: Yup.string(),
      phone_number: Yup.string(),
      default_profile: Yup.string().required("Please select a role"),
      password: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
      bio: Yup.string(),
      profile_image: Yup.string(),
    }),

    onSubmit: values => {
      console.log("ttttttttttttttttttt", values)
      const updateUser = {
        first_name: values["first_name"],
        last_name: values["last_name"],
        email: values["email"],
        username: values["username"],
        phone_number: values["phone_number"],
        default_profile: values["default_profile"],
        password: values["password"],
        address: values["address"],
        city: values["city"],
        profile_image: values["profile_image"],
        zip_code: values["zip_code"],
        bio: values["bio"],
      }
      console.log(updateUser, "[[[[[[[[[[[[[[[[[[[[[[[[[[")
      // save new user
      dispatch(updateUserDetail(updateUser))
      validation.resetForm()

      toggle()
    },
  })
  console.log(validation)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Update User" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        FirstName
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="first_name"
                          className="form-control"
                          type="text"
                          value={user?.first_name}
                          placeholder="Insert First Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.first_name &&
                            validation.errors.first_name
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        LastName
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="last_name"
                          className="form-control"
                          type="text"
                          value={user?.last_name}
                          placeholder="Insert Last Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.last_name &&
                            validation.errors.last_name
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="email"
                          className="form-control"
                          type="email"
                          value={user?.email}
                          placeholder="Insert Email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Username
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="username"
                          className="form-control"
                          type="url"
                          value={user?.username}
                          placeholder="Insert Username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-tel-input"
                        className="col-md-2 col-form-label"
                      >
                        Phone Number
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="phone_number"
                          className="form-control"
                          type="tel"
                          value={user?.phone_number}
                          placeholder="Insert Phone Number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.phone_number &&
                            validation.errors.phone_number
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">
                        Default Role
                      </label>
                      <div className="col-md-10">
                        <select
                          value={user?.default_profile}
                          onChange={e =>
                            validation.setFieldValue(
                              "default_profile",
                              e.target.value
                            )
                          }
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>apprentice</option>
                          <option>instructor</option>
                        </select>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">
                        Profile Image
                      </label>
                      <div className="col-md-10">
                        <Input
                          className="form-control"
                          type="file"
                          id="formFile"
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Address
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="address"
                          className="form-control"
                          type="text"
                          value={user?.address}
                          placeholder="Insert Address"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.address &&
                            validation.errors.address
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        City
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="city"
                          className="form-control"
                          type="text"
                          value={user?.city}
                          placeholder="Insert City"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.city && validation.errors.city
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        ZipCode
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="zip_code"
                          className="form-control"
                          type="text"
                          value={user?.zip_code}
                          placeholder="Insert ZipCode"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.zip_code &&
                            validation.errors.zip_code
                              ? true
                              : false
                          }
                        />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Bio
                      </label>
                      <div className="col-md-10">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </div>
                    </Row>

                    <div>
                      <Button type="submit" color="primary" className="ms-1">
                        Submit
                      </Button>
                      <Button type="reset" color="secondary">
                        Reset
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UpdateUser
