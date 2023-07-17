import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableComp from './TableComp'

describe('TableComp', () => {
  const data = [
    { id: '1', name: 'Apple', revenue: 100 },
    { id: '2', name: 'Banana', revenue: 200 },
  ]

  test('renders correctly with initial data', () => {
    render(<TableComp data={data} />)

    expect(screen.getByText('Orchardex')).toBeInTheDocument()
    expect(screen.getByText('Fruit Fantasia')).toBeInTheDocument()
    expect(screen.getByText('Delicious Dividends')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  test('sorts data correctly when headers are clicked', () => {
    render(<TableComp data={data} />)

    const nameHeader = screen.getByText('Fruit Fantasia')
    fireEvent.click(nameHeader)

    const items = screen.getAllByRole('row')
    expect(items[0].textContent).toContain('Banana')
    expect(items[1].textContent).toContain('Apple')
  })

  test('filters data correctly', () => {
    render(<TableComp data={data} />)

    const filterInput = screen.getByLabelText('Filter by name:')
    fireEvent.change(filterInput, { target: { value: 'Apple' } })

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
  } )
  
  test('sorts data correctly by revenue when header is clicked', () => {
    render(<TableComp data={data} />)
  
    const revenueHeader = screen.getByText('Delicious Dividends')
    fireEvent.click(revenueHeader)
  
    const items = screen.getAllByRole('row')
    expect(items[0].textContent).toContain('Banana')
    expect(items[1].textContent).toContain('Apple')
  } )

  test('displays correct total revenue', () => {
    render(<TableComp data={data} />)

    expect(screen.getByText('300.00')).toBeInTheDocument()
  })

})

