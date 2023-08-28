"use client"
import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, CardBody, Spinner } from "reactstrap"
import { getTransaction as onGetTransaction } from "../../store/transaction/action"

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
// import { latestTransaction } from "../../common/data/dashboard"

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol"

import TableContainer from "../../components/Common/TableContainer"

const LatestTranaction = props => {
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(0)
  const [modal1, setModal1] = useState(false)

  const { transactions, transactionLoading } = useSelector(state => ({
    transactions: state.transactions.transaction,
    transactionLoading: state.transactions.transactionLoading,
  }))

  useEffect(() => {
    if (transactions && !transactions.length) {
      dispatch(onGetTransaction({ starting_after: "" }))
    }
  }, [dispatch, transactions])

  const toggleViewModal = () => setModal1(!modal1)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />
        },
      },
      {
        Header: "Order ID",
        accessor: "charge_id",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />
        },
      },
      {
        Header: "Billing by",
        accessor: "payment_by",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <BillingName {...cellProps} />
        },
      },
      {
        Header: "Date",
        accessor: "created_at",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Total {...cellProps} />
        },
      },
      {
        Header: "Workspace",
        accessor: "workspace_name",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PaymentStatus {...cellProps} />
        },
      },
      {
        Header: "Plan name",
        accessor: "plan_name",
        disableFilters: true,
        Cell: cellProps => {
          return <PaymentMethod {...cellProps} />
        },
      },
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>
          )
        },
      },
    ],
    []
  )

  const fetchNewData = async () => {
    const data = await transactions[transactions.length - 1]
    dispatch(onGetTransaction({ starting_after: data.charge_id }))
  }

  const fetchPreviousData = async () => {
    const data = await transactions[0]
    dispatch(onGetTransaction({ ending_before: data.charge_id }))
  }

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Latest Transaction</div>
          {transactionLoading ? (
            <Spinner className="ms-2" color="light" />
          ) : (
            <TableContainer
              columns={columns}
              data={transactions || []}
              isGlobalFilter={false}
              isAddOptions={false}
              customPageSize={10}
              fetchNextData={fetchNewData}
              fetchOldData={fetchPreviousData}
            />
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)
