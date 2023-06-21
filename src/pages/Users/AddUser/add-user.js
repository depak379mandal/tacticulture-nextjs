import React, { useEffect, useState } from "react"

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
import Select from "react-select"
// Form Editor
import { Editor } from "react-draft-wysiwyg"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addUser } from "store/user/action"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Cropmodal from "pages/Modal/Cropmodal"
// image
import Avtar_image from "../../../assets/images/users/avatar-1.jpg"
//css
import "../../../assets/scss/custom/pages/_add-user.scss"
import { getEventCategory } from "store/events/actions"

const AddUser = () => {
  //meta title
  document.title = "Add User | Tacticulture Admin"

  // redux dispatch
  const dispatch = useDispatch()
  const { user, error } = useSelector(state => state.User)
  const { category } = useSelector(state => state.Event)

  //navigate
  const navigate = useNavigate()

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
      events: [],
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
      password: Yup.string().required("Please Enter Your password"),
      address: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
      bio: Yup.string(),
      profile_image: Yup.string(),
      events: Yup.array().max(10, "Only 10 categories are allowed"),
    }),

    onSubmit: values => {
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
        profile_image: values["profile_image"] ? values["profile_image"] : null,
        zip_code: values["zip_code"],
        bio: values["bio"],
        events: values["events"],
      }
      // save new user
      dispatch(addUser(newUser))
      if (user) {
        navigate("/users-list")
      }
      // validation.resetForm()
      toggle()
    },
  })
  useEffect(() => {
    dispatch(getEventCategory())
  }, [])

  useEffect(() => {
    if (error.message) {
      const convertedErrors = {}
      Object.entries(error.response.data)
        .map(([key, value]) => {
          return {
            [key]: value.join(),
          }
        })
        .forEach(error => {
          const field = Object.keys(error)[0] // Get the field name
          const message = error[field] // Get the error message
          convertedErrors[field] = message
        })
      validation.setErrors(convertedErrors)
    }
  }, [error])
  /* profile Image cropper */
  const [pest, setPest] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [modalShow, setModalShow] = React.useState(false)
  console.log(pest, "kskdjhgihfgh")
  const onChange = e => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // const getCropData = async () => {
  //   if (typeof cropper !== "undefined") {
  //     setCropData(cropper.getCroppedCanvas().toDataURL())
  //   }
  // }
  const [selectedMulti, setselectedMulti] = useState(null)
  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti)
  }

  const newOptions = category?.map(item => ({
    label: item.event_categories,
    value: item.id,
  }))
  const [bio, setBio] = useState("")
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
                        <span className="text-danger">
                          {validation.touched.first_name &&
                            validation.errors.first_name}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.last_name &&
                            validation.errors.last_name}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.email && validation.errors.email}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.username &&
                            validation.errors.username}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.phone_number &&
                            validation.errors.phone_number}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.password &&
                            validation.errors.password}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.default_profile &&
                            validation.errors.default_profile}
                        </span>
                      </div>
                    </Row>
                    {/* <Row className="mb-3">
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
                    </Row> */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">
                        Profile Image
                      </label>
                      <div className="col-md-10">
                        {/* <Input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                      /> */}

                        <div className="">
                          <div className="">
                            <img
                              src={pest ? pest : Avtar_image}
                              className="profile_image_adduser"
                              alt="image"
                            />
                          </div>

                          <input
                            type="file"
                            id="actual-btn"
                            onChange={e => {
                              if (e.target.files.length > 0) {
                                setTempImage(e)
                                setModalShow(true)
                              }
                            }}
                            hidden
                          />
                          <label
                            htmlFor="actual-btn"
                            className="select_image_button"
                          >
                            Choose Image
                          </label>
                        </div>
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
                        <span className="text-danger">
                          {validation.touched.address &&
                            validation.errors.address}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.city && validation.errors.city}
                        </span>
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
                        <span className="text-danger">
                          {validation.touched.zip_code &&
                            validation.errors.zip_code}
                        </span>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Event Interest
                      </label>
                      <div className="col-md-10">
                        <Select
                          name="events"
                          value={selectedMulti}
                          isMulti={true}
                          onChange={val => {
                            // console.log("val", val)
                            handleMulti(val)
                            validation.setFieldValue(
                              "events",
                              val.map(item => item.value)
                            )
                          }}
                          options={newOptions}
                          className="select2-selection"
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
                          // initialContentState={validation.values.bio}
                          // value={validation.values.bio}
                          // onChange={
                          //   e => {
                          //     console.log("e -- ", e.blocks.t)
                          //   }
                          //   validation.setFieldValue("bio", e.target.value)
                          // }
                          // value={bio}
                          // onContentStateChange={value =>
                          //   validation.setFieldValue("bio", value)
                          // }
                        />
                        <span className="text-danger">
                          {validation.touched.bio && validation.errors.bio}
                        </span>
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
      <Cropmodal
        show={modalShow}
        onHide={() => setModalShow(false)}
        pest={pest}
        onImageChange={val => {
          validation.setFieldValue("profile_image", val)
        }}
        tempImage={tempImage}
        setTempImage={setTempImage}
        setPest={setPest}
      />
    </React.Fragment>
  )
}

export default AddUser
