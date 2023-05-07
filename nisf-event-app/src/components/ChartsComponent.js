import React, { useState } from 'react'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import PieCharts from './PieChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsComponent = () => {

  const [barChart, setBarChart] = useState(true)

  const { weeklySubmissions: data } = useAppContext()
  const { eventTheme: data01 } = useAppContext()
  const { eventTypes: data02 } = useAppContext()
  const { eventCounty: data03 } = useAppContext()

  return (
    <Wrapper>
      <div className='charts'>
        <div className='chart'>
          <h5>Weekly Submissions</h5>
          <button type='button' onClick={() => setBarChart(!barChart)}>
            {barChart ? 'Area Chart' : 'Bar Chart'}
          </button>
          {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </div>
        <div className='chart'>
          <h5>Events by Type</h5>
          {<PieCharts data={data02} filterName='searchType' />}
        </div>

      </div>


      <div className='charts'>

        <div className='chart'>
          <h5>Events by County</h5>
          {<PieCharts data={data03} />}
        </div>
        <div className='chart'>
          <h5>Events by Theme</h5>
          {<PieCharts data={data01} />}
        </div>

      </div>


    </Wrapper>

  )

}

export default ChartsComponent