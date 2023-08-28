"use client"
import React, { useEffect, useState } from "react"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import ApexRadial from "./ApexRadial"
import moment from "moment"

const MonthlyEarning = () => {
  const dispatch = useDispatch()
  const [percentage, setPercentage] = useState(0)
  const { monthlyChart } = useSelector(state => ({
    monthlyChart: state.Dashboard.monthlyChart,
  }))

  useEffect(() => {
    getPercenatge()
  }, [monthlyChart.length])

  const getPercenatge = () => {
    if (monthlyChart.length > 1) {
      const previousMonth = monthlyChart.find(el => {
        return (
          el.month ==
          moment(new moment().subtract(1, "months")).format("MMM") && el
        )
      })
      const currentMonth = monthlyChart.find(el => {
        return el.month == moment(new Date()).format("MMM") && el
      })

      const amount = currentMonth.amount - previousMonth.amount
      const percentage = (amount / previousMonth.amount) * 100
      setPercentage(percentage)
    }
  }
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Monthly Earning</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted">This month</p>

              <h3>
                {monthlyChart.map((el, index) => {
                  return (
                    el.month == moment(new Date()).format("MMM") &&
                    `${el.amount}$`
                  )
                })}
              </h3>
              {/* {percentage != "Infinity" && ( */}
              <p className="text-muted">
                <span
                  className={
                    percentage > 0 ? "text-success me-2" : "text-danger me-2"
                  }
                >
                  {" "}
                  {parseFloat(percentage).toFixed(2)}{" "}
                  <i
                    className={
                      percentage > 0 ? "mdi mdi-arrow-up" : "mdi mdi-arrow-down"
                    }
                  ></i>{" "}
                </span>{" "}
                From previous month
              </p>
              {/* )} */}
              {/* <div className="mt-4">
                <Link
                  to="#"
                  className="btn btn-primary waves-effect waves-light btn-sm"
                >
                  View More <i className="mdi mdi-arrow-right ms-1"></i>
                </Link>
              </div> */}
            </Col>
            {/* <Col sm="6">
              <div className="mt-4 mt-sm-0">
                <ApexRadial dataColors='["--bs-primary"]' />
              </div>
            </Col> */}
          </Row>
          {/* <p className="text-muted mb-0">
            We craft digital, graphic and dimensional thinking.
          </p> */}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
