import React, {useState} from 'react'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import PieCharts from './PieChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  
  const[barChart, setBarChart] = useState(true)

  const {weeklySubmissions:data} = useAppContext()
  const {eventTheme:data01} = useAppContext()
  const{eventTypes:data02} = useAppContext()
 
  return (
<Wrapper>
  <div>
  <h4>Weekly Submissions</h4>
  <button type='button' onClick={()=>setBarChart(!barChart)}>
    {barChart ? 'Area Chart' : 'Bar Chart'}    
  </button>
  {barChart ? <BarChart data= {data} /> : <AreaChart data={data} />}
  </div>
  <div>
  <h4>Events by Theme</h4>
 { <PieCharts data = {data01}/>}
  </div>
  <div>
  <h4>Events by Type</h4>
 { <PieCharts data = {data02}/>}
  </div>
         
</Wrapper>

  )
 
}

export default ChartsContainer