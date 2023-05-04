import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import {TiTickOutline, TiTimesOutline, TiTime} from 'react-icons/ti'


const StatsContainer = () => {
  const {stats} = useAppContext()
  const defaultStats = [

    {
      title:'approved',
      count: stats.approved || 0,
      icon:<TiTickOutline/>,
      color: '#5f914a',
      bcg: ''
      
    },

    {
      title:'pending',
      count: stats.pending || 0,
      icon:<TiTime/>,
      color: '#ffb732',
      bcg: ''
      
    },
    
    {
      title:'declined',
      count: stats.declined || 0,
      icon:<TiTimesOutline/>,
      color: '#ff3232',
      bcg: ''
      
    }

  ]
  return (
    <Wrapper>    
     {defaultStats.map((item, index) => {
      return <StatItem key={index} {...item} />
     })}     
    </Wrapper>
    
  )
}

export default StatsContainer