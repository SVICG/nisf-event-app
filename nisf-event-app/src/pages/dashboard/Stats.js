import { useEffect } from 'react'
import { StatsContainer, Loading, ChartsComponent } from '../../components'
import { useAppContext } from '../../context/appContext'


const Stats = () => {
  const { showStats, isLoading, weeklySubmissions, updateSearch } = useAppContext()

  useEffect(() => {
    showStats()
    updateSearch({ name: 'searchStatus', value: 'all' })
    updateSearch({ name: 'searchType', value: 'all' })
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <h2>Events Overview</h2>
      <StatsContainer />

      {/* only show if not at 0 litsings */}
      {weeklySubmissions.length > 0 && <ChartsComponent />}

    </>
  )

}



export default Stats