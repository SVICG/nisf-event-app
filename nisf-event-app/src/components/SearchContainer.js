import React from 'react'
import { FormRow, FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import { useState, useMemo } from 'react'

const SearchContainer = () => {

  const [localSearch, setLocalSearch] = useState('')
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
    statusOptions
  } = useAppContext()

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();

  }

  const debounce = () => {
    let timeoutID;
    return (e) => { setLocalSearch(e.target.value)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(()=>{
      handleChange({ name: e.target.name, value: e.target.value })
    },500)
  }
  }

  //prevent re-renders
  const optDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>
          {/* search */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
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
            value={sort}
            handleChange={handleSearch}
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