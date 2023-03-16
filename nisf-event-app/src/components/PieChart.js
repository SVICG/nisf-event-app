import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#06A77D', '#A79AB2', '#81B552', '#48233C', '#AB2346'];
const PieCharts = ({ data }) => {

    let renderLabel = function(data) {
        return data._id;
    }

    return (
        
        <ResponsiveContainer width={600} height={300}>
        <PieChart data ={data} width={400} height={400}>
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
          >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
}

export default PieCharts