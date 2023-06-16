import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            series: [],
            options: null,
        };
    }

    componentDidMount() {
        this.showGraph()
    }

    showGraph() {
        this.setState({ loading: true })
        var data = []
        var series = { name: "Sum of Sales" }
        var seriesArray = []
        var categories = []

        if (localStorage.getItem('chart1')) {
            let chartData = JSON.parse(localStorage.getItem('chart1'))
            for (let i = 0; i < chartData.length; i++) {
                const element = chartData[i];
                if (element) {
                    data.push(element.sum_of_sales)
                    categories.push(element.year)
                }
            }
            series['data'] = data
        }

        seriesArray.push(series)
        this.setState({
            series: seriesArray,
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Year',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: categories,
                    title: {
                        text: 'Year'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Sum of Sales'
                    },
                },
                legend: {
                    position: 'bottom',
                }
            }, loading: false
        })
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: "center" }}><CircularProgress /></Box> :
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />}
            </div>
        )
    }
}

export default ApexChart
