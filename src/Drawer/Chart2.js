import { Box } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import Graph2 from '../Graphs/Graph2';

const Chart2 = () => {

  const [data, setData] = useState([]);
  const [flow, setFlow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
  }, []);

  function getData() {
    setLoading(true)
    if (localStorage.getItem('chart2')) {
      var data = JSON.parse(localStorage.getItem('chart2'))
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
      <Box>
        <MaterialTable
          title="Table"
          columns={[
            { title: 'Country', field: 'country' },
            { title: 'Sum of Sales($million)', field: 'sum_of_sales', type: 'numeric' },
          ]}
          data={data}
          isLoading={loading}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (!newData.country || !newData.sum_of_sales) {
                    alert("Fill all fields")
                    resolve();
                  } else {
                    const data1 = [...data];
                    data1.push(newData);
                    setData(data1)
                    localStorage.setItem('chart2', JSON.stringify(data1));
                    resolve();
                  }
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (!newData.country || !newData.sum_of_sales) {
                    alert("Fill all fields")
                    resolve();
                  } else {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    localStorage.setItem('chart2', JSON.stringify(dataUpdate));
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
                  localStorage.setItem('chart2', JSON.stringify(dataDelete));
                  resolve()
                }, 1000);
              })
          }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </Box>
      <Box sx={{width:"100%"}}>
        <Graph2 />
      </Box>
    </div>
  )
}

export default Chart2