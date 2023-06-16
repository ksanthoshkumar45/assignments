import { Box } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import Graph4 from '../Graphs/Graph4';

const Chart4 = () => {

    const [data, setData] = useState([]);
    const [flow, setFlow] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    function getData() {
        setLoading(true)
        if (localStorage.getItem('chart4')) {
            var data = JSON.parse(localStorage.getItem('chart4'))
            setData(data)
        }
        setLoading(false)
    }

    function addData(newData) {
        setLoading(true)
        let datas = data
        datas.push(newData)
        setData(datas)
        setLoading(false)
        localStorage.setItem('value', JSON.stringify(data));
        getData()
    }

    return (
        <div>
            <MaterialTable
                title="Table"
                columns={[
                    { title: 'Year', field: 'year', type: 'numeric' },
                    { title: 'Sum of Sales($million)', field: 'sum_of_sales', type: 'numeric' },
                    { title: 'Sum of Capex ($million)', field: 'sum_of_capex', type: 'numeric' },
                    { title: 'Sum of Profit ($million)', field: 'sum_of_profit', type: 'numeric' },
                    { title: 'Sum of Market cap ($million)', field: 'sum_of_market_cap', type: 'numeric' },
                ]}
                data={data}
                isLoading={loading}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (!newData.year || !newData.sum_of_sales || !newData.sum_of_capex || !newData.sum_of_profit || !newData.sum_of_market_cap) {
                                    alert("Fill all fields")
                                    resolve();
                                } else {
                                    const data1 = [...data];
                                    data1.push(newData);
                                    setData(data1)
                                    localStorage.setItem('chart4', JSON.stringify(data1));
                                    resolve();
                                }

                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (!newData.year || !newData.sum_of_sales || !newData.sum_of_capex || !newData.sum_of_profit || !newData.sum_of_market_cap) {
                                    alert("Fill all fields")
                                    resolve();
                                } else {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);
                                    localStorage.setItem('chart4', JSON.stringify(dataUpdate));
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
                                localStorage.setItem('chart4', JSON.stringify(dataDelete));
                                resolve()
                            }, 1000);
                        })
                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <Box>
                <Graph4 />
            </Box>
        </div>
    )
}

export default Chart4