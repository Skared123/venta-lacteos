"use client"
import React, { useEffect, useState } from 'react'
import ProductsForm from './components/create-products-form'
import ProductsList from './components/ProductsList'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Product } from '@/interfaces/products.interface'

export default function ProductsView() {



  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl p-2'>Lista de productos</h2>
        <ProductsForm/>
      </div>
      <div className='mt-4'>
        <ProductsList/>
      </div>
    </div>
  )
}
