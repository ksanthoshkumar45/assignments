import React, { Component } from 'react'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { Box, CircularProgress } from '@mui/material';

charts(FusionCharts);

export default class Graph3 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            dataSource: {
                chart: {
                    caption: "Countries with Highest Sum of Profits",
                    yaxisname: "Sum of Profits",
                    xaxisname: 'Industrial Sector',
                    decimals: "1",
                    theme: "candy"
                },
                data: []
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let data = []
        let dataSource = this.state.dataSource
        this.setState({ loading: true })
        if (localStorage.getItem('chart3')) {
            let chartData = JSON.parse(localStorage.getItem('chart3'))
            for (let i = 0; i < chartData.length; i++) {
                const element = chartData[i];
                let obj = {}
                if (element) {
                    obj['label'] = element.industrial_sector
                    obj['value'] = element.sum_of_profits
                    data.push(obj)
                }
            }
            dataSource['data'] = data
        }
        this.setState({ dataSource, loading: false })
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'Center' }}><CircularProgress /></Box> :
                    <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="100%"
                        dataFormat="JSON"
                        dataSource={this.state.dataSource}
                    />
                }
            </div>
        )
    }
}
