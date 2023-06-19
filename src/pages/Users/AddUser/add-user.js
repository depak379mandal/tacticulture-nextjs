import React from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addUser } from "store/user/action"
import { useDispatch } from "react-redux"
const AddUser = () => {
  //meta title
  document.title = "Add User | Tacticulture Admin"

  // redux dispatch
  const dispatch = useDispatch()

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      phone_number: "",
      default_profile: "",
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
      default_profile: Yup.string(),
      password: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
      bio: Yup.string(),
      profile_image: Yup.string(),
    }),

    onSubmit: values => {
      console.log("ttttttttttttttttttt", values)
      const newUser = {
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
      console.log(newUser, "[[[[[[[[[[[[[[[[[[[[[[[[[[")
      // save new user
      dispatch(addUser(newUser))
      validation.resetForm()

      toggle()
    },
  })
  console.log(validation)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Add User" />

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
                          placeholder="Insert First Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.first_name || ""}
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
                          placeholder="Insert Last Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.last_name || ""}
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
                          placeholder="Insert Email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
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
                          placeholder="Insert Username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
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
                          placeholder="Insert Phone Number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_number || ""}
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
                      <label
                        htmlFor="example-password-input"
                        className="col-md-2 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col-md-10">
                        <Input
                          name="password"
                          className="form-control"
                          type="password"
                          placeholder="Insert Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
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
                          value={validation.values.default_profile}
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
                          placeholder="Insert Address"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address || ""}
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
                          placeholder="Insert City"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.city || ""}
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
                          placeholder="Insert ZipCode"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.zip_code || ""}
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
                          // value={validation.values.bio}
                          // onChange={
                          //   e => {
                          //     console.log("e -- ", e.blocks.t)
                          //   }
                          //   validation.setFieldValue("bio", e.target.value)
                          // }
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

export default AddUser
