import { useEffect } from 'react'
import { StatsContainer, Loading, ChartsContainer } from '../../components'
import { useAppContext } from '../../context/appContext'



const Stats = () => {
  const { showStats, isLoading, weeklySubmissions } = useAppContext()

  useEffect (()=> {
    showStats()
    // eslint-disable-next-line
  }, [])

  if(isLoading){
    return <Loading center />
  }

  return (
    
    <>
    <h1>Events</h1>
    <StatsContainer />
    

    {/* only show if not at 0 litsings */}
    {weeklySubmissions.length > 0 && <ChartsContainer />}
    
    </>
  )

}



export default Stats