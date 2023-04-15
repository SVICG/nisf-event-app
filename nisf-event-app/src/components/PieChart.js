import React from 'react'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const COLORS = ['#028963',
  '#049958',
  '#5ca009',
  '#02892d',
  '#10a818',
  '#0e8c79',
  '#8e9e04',
  '#3c9609',
  '#0b8254',
  '#0c7f68',
  '#069688',
  
  ];
const PieCharts = ({ data, filterName }) => {
  const { updateSearch } = useAppContext();

  let navigate = useNavigate(); 

  const handleUpdateStatus = (label) => {
   
    updateSearch({ name: 'searchType', value: label })
    navigate('/')
    
  };


    let renderLabel = function(data) {
        return data._id;
    }

    return (
        
        <ResponsiveContainer width='100%' height={300}>
        <PieChart data={data} margin={{top:20}} filterName={filterName}>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            nameKey="_id"
            label = {renderLabel}
            
            onClick={(data) => {if(filterName === 'searchType') {handleUpdateStatus(data._id)}}}
          >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} style={{outline: 'none'}} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
}

export default PieCharts