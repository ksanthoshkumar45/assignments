import MaterialTable from 'material-table';
import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';
import Graph3 from '../Graphs/Graph3';

const Chart3 = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null)

  useEffect(() => {
    getData()
  }, []);

  function getData() {
    setLoading(true)
    if (localStorage.getItem('chart3')) {
      var data = JSON.parse(localStorage.getItem('chart3'))
      setData(data)
    }
    setLoading(false)
  }

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <MaterialTable
            title="Table"
            columns={[
              { title: 'Industrial Sector', field: 'industrial_sector' },
              { title: 'Sum of Profits($million)', field: 'sum_of_profits', type: 'numeric' },
            ]}
            data={data}
            isLoading={loading}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (!newData.industrial_sector || !newData.sum_of_profits) {
                      alert("Fill all fields")
                      resolve();
                    } else {
                      const data1 = [...data];
                      data1.push(newData);
                      setData(data1)
                      localStorage.setItem('chart3', JSON.stringify(data1));
                      if (chartRef && chartRef.current) {
                        chartRef.current.getData()
                      }
                      resolve();
                    }
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (!newData.industrial_sector || !newData.sum_of_profits) {
                      alert("Fill all fields")
                      resolve();
                    } else {
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);
                      localStorage.setItem('chart3', JSON.stringify(dataUpdate));
                      if (chartRef && chartRef.current) {
                        chartRef.current.getData()
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
                    localStorage.setItem('chart3', JSON.stringify(dataDelete));
                    if (chartRef && chartRef.current) {
                      chartRef.current.getData()
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
        <Box sx={{ mt: 1 }}>
          <Graph3 ref={chartRef} />
        </Box>
      </Box>

    </div>
  )
}

export default Chart3