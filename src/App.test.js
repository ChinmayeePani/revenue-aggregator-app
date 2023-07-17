/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { generateUniqueId } from './utils/generateUniqueId'

const server = setupServer(
  rest.get('/branches/branch1.json', (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          { id: '1', name: 'Apple', unitPrice: 1, sold: 100 },
          { id: '2', name: 'Banana', unitPrice: 2, sold: 100 },
        ],
      })
    )
  }),
  rest.get('/branches/branch2.json', (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          { id: '1', name: 'Apple', unitPrice: 1, sold: 100 },
          { id: '2', name: 'Banana', unitPrice: 2, sold: 100 },
        ],
      })
    )
  }),
  rest.get('/branches/branch3.json', (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          { id: '1', name: 'Apple', unitPrice: 1, sold: 100 },
          { id: '2', name: 'Banana', unitPrice: 2, sold: 100 },
        ],
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders correctly with empty data', async () => {
  server.use(
    rest.get('/branches/branch1.json', (req, res, ctx) => {
      return res(ctx.json({ products: [] }))
    }),
    rest.get('/branches/branch2.json', (req, res, ctx) => {
      return res(ctx.json({ products: [] }))
    }),
    rest.get('/branches/branch3.json', (req, res, ctx) => {
      return res(ctx.json({ products: [] }))
    })
  )

  render(<App />)

  await waitFor(() => {
    expect(
      screen.getByText(/No products revenue details available at the moment !/i)
    ).toBeInTheDocument()
  })
})


describe('App', () => {
  test('fetches and displays data correctly', async () => {
    render(<App />)

    await waitFor(() => {
      const items = screen.getAllByRole('row')
      expect(items[0]).toHaveTextContent('Apple')
      expect(items[1]).toHaveTextContent('Banana')
    })
  })

  test('combines data correctly', async () => {
    render(<App />)

    await waitFor(() => {
      const items = screen.getAllByRole('row')

      expect(items[0]).toHaveTextContent('Apple')
      expect(items[0]).toHaveTextContent('300.00')
      expect(items[1]).toHaveTextContent('Banana')
      expect(items[1]).toHaveTextContent('600.00')
    })
  })
} )

test('generates unique IDs', () => {
  const id1 = generateUniqueId()
  const id2 = generateUniqueId()
  const id3 = generateUniqueId()

  // check that all IDs are different
  expect(id1).not.toEqual(id2)
  expect(id1).not.toEqual(id3)
  expect(id2).not.toEqual(id3)
})
