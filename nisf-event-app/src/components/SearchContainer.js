import React from 'react'
import { FormRow, FormRowSelect, FormDateSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import { useState, useMemo } from 'react'
// Debounce amended from https://javascript.plainenglish.io/implementing-debouncing-in-react-f3316ef344f5

const SearchContainer = () => {

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    eventTypeOptions,
    statusOptions,
    sortDate,
    getEvents
  } = useAppContext()

  const [searchTerm, setSearchTerm] = useState('')
   const [valueT, setValue] = React.useState([])

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleDate= (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
    getEvents(e.target.value)
  }



  const debounce = () => {
    let timer;
    return (e) => {
      setSearchTerm(e.target.value)
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 500)
    }
  }

  //prevent re-renders with useMemo rather than useCallback
  const optDebounce = useMemo(() => debounce(), [])

  const handleSubmit = (e) => {

    clearFilters();
    e.preventDefault();
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Event Search</h4>
        <div className='form-center'>
          {/* search */}
          <FormRow
            type='text'
            name='search'
            value={searchTerm}
            handleChange={optDebounce}
          />
          {/* status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...eventTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            labelText='Sort By Submission Date'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          {/* sort event date */}
          <FormRowSelect
            name='sortDate'
            labelText='Sort by event date'
            value={sortDate}
            handleChange={handleDate}
            list={sortOptions}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}>
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer