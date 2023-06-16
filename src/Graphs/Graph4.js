import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

export default class Graph4 extends Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Marine Sprite',
                data: [44, 55, 41, 37, 22, 43, 21]
            }, {
                name: 'Striking Calf',
                data: [53, 32, 33, 52, 13, 43, 32]
            }, {
                name: 'Tank Picture',
                
                data: [12, 17, 11, 9, 15, 11, 20]
            }, {
                name: 'Bucket Slope',
                data: [9, 7, 5, 8, 6, 9, 4]
            }, {
                name: 'Reborn Kid',
                data: [25, 12, 19, 32, 25, 24, 10]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: '100% Stacked Bar'
                },
                xaxis: {
                    categories: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "K"
                        }
                    }
                },
                fill: {
                    opacity: 1

                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },


        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        )
    }
}
