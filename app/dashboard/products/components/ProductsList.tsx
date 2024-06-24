import { Product } from '@/interfaces/products.interface'
import { ProductCard } from './ProductCard'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ProductsList() {

  const [dataProducts, setDataProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchAllProducts()
  },[dataProducts])

  const fetchAllProducts = async() => {
    try {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Product
      }));

      setDataProducts(productList)
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }

  return (
    <div className='grid grid-cols-2'>
    {dataProducts.map((product : Product) => (
      <ProductCard product={product}/>
    ))}
    </div>
  )
}
