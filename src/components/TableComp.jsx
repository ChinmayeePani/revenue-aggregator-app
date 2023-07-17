import React, { useEffect, useState } from 'react'
import './TableComp.css'
import { BsArrowDown, BsArrowUp, BsSortNumericDown } from 'react-icons/bs'
import { AiOutlineSortAscending } from 'react-icons/ai'

const TableComp = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  })

  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredData(filteredItems)
  }, [data, filter])

  const sortData = (key) => {
    let direction = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const getTotalRevenue = () => {
    const totalRevenue = sortedData.reduce(
      (total, item) => total + item.revenue,
      0
    )
    return totalRevenue.toFixed(2)
  }

  return (
    <div className='table-container'>
      <div className='filter-container'>
        <label htmlFor='filter-input' className='filter-label'>
          Filter by name:
        </label>
        <input
          type='text'
          id='filter-input'
          placeholder='Enter product name'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='filter-input'
        />
      </div>
      <div className='table-header'>
        <div className='table-column sno'>
          <button className='head-col'>Orchardex</button>
        </div>
        <div className='table-column sort'>
          <button className='head-col' onClick={() => sortData('name')}>
            Fruit Fantasia
          </button>
          {sortConfig.key !== 'name' ? (
            <AiOutlineSortAscending className='sort-icon' />
          ) : sortConfig.key === 'name' && sortConfig.direction === 'asc' ? (
            <BsArrowDown className='sort-icon' />
          ) : (
            <BsArrowUp className='sort-icon' />
          )}
        </div>
        <div className='table-column sort'>
          <button className='head-col' onClick={() => sortData('revenue')}>
            Delicious Dividends
          </button>
          {sortConfig.key !== 'revenue' ? (
            <BsSortNumericDown className='sort-icon' />
          ) : sortConfig.key === 'revenue' && sortConfig.direction === 'asc' ? (
            <BsArrowDown className='sort-icon' />
          ) : (
            <BsArrowUp className='sort-icon' />
          )}
        </div>
      </div>
      <div className='table-body'>
        {sortedData.map((item, index) => (
          <div className='table-row' role='row' key={item.id}>
            <div className='table-column sno'>{index + 1}</div>
            <div className='table-column'>{item.name}</div>
            <div className='table-column revenue'>
              {item.revenue.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className='total-revenue'>
        <span>Fruity Net Revenue</span>
        <span>{getTotalRevenue()}</span>
      </div>
    </div>
  )
}

export default TableComp
