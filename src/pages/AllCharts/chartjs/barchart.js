import React, { useEffect } from "react"
import { Bar } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"
import { useDispatch, useSelector } from "react-redux"
import { getMonthlyChart } from "store/actions"

const BarChart = ({ dataColors }) => {
  const dispatch = useDispatch()
  var barChartColor = getChartColorsArray(dataColors)

  const { monthlyChart } = useSelector(state => ({
    monthlyChart: state.Dashboard.monthlyChart,
  }))

  useEffect(() => {
    if (monthlyChart && !monthlyChart.length) {
      dispatch(getMonthlyChart())
    }
  }, [dispatch, monthlyChart])

  const data = {
    labels: monthlyChart.map(el => el.month),
    datasets: [
      {
        label: "Amount Analytics",
        backgroundColor: barChartColor[0],
        borderColor: barChartColor[0],
        borderWidth: 1,
        hoverBackgroundColor: barChartColor[1],
        hoverBorderColor: barChartColor[1],
        data: monthlyChart.map(el => el.amount),
      },
    ],
  }

  const option = {
    scales: {
      dataset: [
        {
          barPercentage: 0.4,
        },
      ],
    },
  }
  // console.log(data, "data")
  return <Bar width={751} height={300} data={data} options={option} />
}

export default BarChart
