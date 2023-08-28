"use client"
import PropTypes from "prop-types"
import React from "react"
import { layoutTypes } from "@/constants/layout"
import VerticalLayout from "@/components/VerticalLayout/"
import HorizontalLayout from "@/components/HorizontalLayout/"
import store from "@/store"

// Import scss
import "@/assets/scss/theme.scss"
import { Provider } from "react-redux"

const getLayout = layoutType => {
  let Layout = VerticalLayout
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout
      break
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout
      break
    default:
      break
  }
  return Layout
}

const App = ({ children }) => {
  // const { layoutType } = useSelector(state => ({
  //   layoutType: state.Layout.layoutType,
  // }))

  // const Layout = getLayout(layoutType)

  return (
    <html>
      <head></head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
