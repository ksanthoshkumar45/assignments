import { Box } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useRef, useState } from 'react'
import Graph1 from '../Graphs/Graph1';

const Chart1 = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const chartRef = useRef(null)

    useEffect(() => {
        getData()
    }, []);

    function getData() {
        setLoading(true)
        if (localStorage.getItem('chart1')) {
            var data = JSON.parse(localStorage.getItem('chart1'))
            setData(data)
        }
        setLoading(false)
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center", width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                    <MaterialTable
                        title="Year end sales"
                        columns={[
                            { title: 'Year', field: 'year', type: 'numeric' },
                            { title: 'Sum of Sales($million)', field: 'sum_of_sales', type: 'numeric' },
                        ]}
                        data={data}
                        isLoading={loading}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        if (!newData.year || !newData.sum_of_sales) {
                                            alert("Fill all fields")
                                            resolve();
                                        } else {
                                            const data1 = [...data];
                                            data1.push(newData);
                                            setData(data1)
                                            localStorage.setItem('chart1', JSON.stringify(data1));
                                            if (chartRef && chartRef.current) {
                                                chartRef.current.showGraph()
                                            }
                                            resolve();
                                        }
                                    }, 1000);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        if (!newData.year || !newData.sum_of_sales) {
                                            alert("Fill all fields")
                                            resolve();
                                        } else {
                                            const dataUpdate = [...data];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setData([...dataUpdate]);
                                            localStorage.setItem('chart1', JSON.stringify(dataUpdate));
                                            if (chartRef && chartRef.current) {
                                                chartRef.current.showGraph()
                                            }
                                            resolve();
                                        }
                                    }, 1000);
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);
                                        localStorage.setItem('chart1', JSON.stringify(dataDelete));
                                        if (chartRef && chartRef.current) {
                                            chartRef.current.showGraph()
                                        }
                                        resolve()
                                    }, 1000);
                                })
                        }}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Box>
                <Box sx={{ mt: 1, width: '100%' }}>
                    <Graph1 ref={chartRef} />
                </Box>
            </Box>


        </div>
    )
}

export default Chart1