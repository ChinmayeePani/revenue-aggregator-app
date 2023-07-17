import { useEffect, useState } from 'react'
import './App.css'
import TableComp from './components/TableComp'
import { generateUniqueId } from './utils/generateUniqueId'

function App() {
  const [data, setData] = useState([])
  const [combinedData, setCombinedData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      const fileNames = ['branch1.json', 'branch2.json', 'branch3.json']
      const fetchByLoop = fileNames.map(async (filename) => {
        const response = await fetch(`/branches/${filename}`)
        const jsonData = await response.json()

        const processedData = jsonData.products.map((product) => {
          const { id, name, unitPrice, sold } = product
          const revenue = unitPrice * sold // what if it is NaN

          return {
            id,
            name,
            unitPrice,
            sold,
            revenue,
          }
        })

        return processedData
      })
      const allProducts = await Promise.all(fetchByLoop)
      const mergeData = allProducts.flat()

      setData(mergeData)
    }
    fetchAllData()
  }, [])

  useEffect(() => {
    const combineData = () => {
      const combinedProducts = []
      data.forEach((product) => {
        const existingProduct = combinedProducts.find(
          (item) => item.name === product.name
        )

        if (existingProduct) {
          existingProduct.revenue += product.revenue
        } else {
          combinedProducts.push({
            id: generateUniqueId(),
            name: product.name,
            revenue: product.revenue,
          })
        }
      })

      const sortedProducts = combinedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      setCombinedData(sortedProducts)
    }

    combineData()
  }, [data])

  console.log(data)
  console.log(combinedData)

  return (
    <div className='app' style={{ backgroundImage: "url('./bg.jpg')" }}>
      <h2 className='app-name'>Revenue Aggregator</h2>
      {combinedData.length > 0 ? (
        <TableComp data={combinedData} />
      ) : (
        <p className='no-products'>
          No products revenue details available at the moment !
        </p>
      )}
    </div>
  )
}

export default App
