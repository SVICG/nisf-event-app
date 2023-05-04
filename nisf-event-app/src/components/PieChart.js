import React from 'react'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const COLORS = [
  '#028963',
  '#e3342f',
  '#f6993f',
  '#ffd04e',
  '#38c172',
  '#4dc0b5',
  '#3490dc',
  '#6574cd',
  '#9561e2',
  '#f66d9b',
  '#069688',

];
const PieCharts = ({ data, filterName }) => {
  const { updateSearch } = useAppContext();

  let navigate = useNavigate();

  const handleUpdateStatus = (label) => {

    updateSearch({ name: 'searchType', value: label })
    navigate('/')

  };


  let renderLabel = function (data) {
    return data._id;
  }

  return (

    <ResponsiveContainer width='100%' height={300}>
      <PieChart data={data} margin={{ top: 20 }} filterName={filterName}>
        {/* <Legend layout="vertical" verticalAlign="top" align="left" /> */}
        <Pie
          dataKey="count"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          nameKey="_id"
          label={renderLabel}
          onClick={(data) => { if (filterName === 'searchType') { handleUpdateStatus(data._id) } }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} style={{ outline: 'none' }} fill={COLORS[index % COLORS.length]} dataKey={data._id} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieCharts