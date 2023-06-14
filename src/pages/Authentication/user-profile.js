import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar1 from "../../assets/images/users/user.svg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

const UserProfile = () => {
  //meta title
  document.title = "Profile | Roadmap - Admin"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [profile, setProfile] = useState({
    name: "",
    password: "",
    newpassword: "",
    confirmpassword: "",
  })
  const [idx, setidx] = useState(1)

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setProfile({ ...profile, name: obj.full_name })
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setProfile({ ...profile, name: obj.full_name })
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // username: profile.name || "",
      current_password: profile.password || "",
      new_password: profile.newpassword || "",
      new_password_confirmation: profile.confirmpassword || "",
      // idx: idx || "",
    },
    validationSchema: Yup.object({
      // username: Yup.string().required("Please Enter Your UserName"),
      current_password: Yup.string().required("Please Enter Your Password"),
      new_password: Yup.string().required("Please Enter Your New Password"),
      new_password_confirmation: Yup.string()
        .required("Please Enter Your Confirm Password")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: values => {
      dispatch(editProfile(values))
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Roadmap" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar1}
                        alt=""
                        className="rounded-circle header-profile-user"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{profile.name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Input
                  name="current_password"
                  // value={name}
                  className="form-control mb-3"
                  placeholder="Enter password"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.current_password || ""}
                  invalid={
                    validation.touched.current_password &&
                    validation.errors.current_password
                      ? true
                      : false
                  }
                />
                {validation.touched.current_password &&
                validation.errors.current_password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.current_password}
                  </FormFeedback>
                ) : null}

                <Input
                  name="new_password"
                  // value={name}
                  className="form-control mb-3"
                  placeholder="Enter New Password"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.new_password || ""}
                  invalid={
                    validation.touched.new_password &&
                    validation.errors.new_password
                      ? true
                      : false
                  }
                />
                {validation.touched.new_password &&
                validation.errors.new_password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.new_password}
                  </FormFeedback>
                ) : null}

                <Input
                  name="new_password_confirmation"
                  // value={name}
                  className="form-control mb-3"
                  placeholder="Enter Confirm Password"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.new_password_confirmation || ""}
                  invalid={
                    validation.touched.new_password_confirmation &&
                    validation.errors.new_password_confirmation
                      ? true
                      : false
                  }
                />
                {validation.touched.new_password_confirmation &&
                validation.errors.new_password_confirmation ? (
                  <FormFeedback type="invalid">
                    {validation.errors.new_password_confirmation}
                  </FormFeedback>
                ) : null}

                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
