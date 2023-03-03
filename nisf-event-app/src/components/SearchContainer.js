import React from 'react'
import { FormRow, FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'


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
    statusOptions
  } = useAppContext()

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();

  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>
          {/* search */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
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