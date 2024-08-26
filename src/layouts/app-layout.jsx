import Header from '@/components/header'
import '../App.css'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      <div className='background'></div>
      <main className='min-h-screen container'>
        <Header />
        <Outlet />
      </main>
      <footer className='p-10 text-center bg-gray-800 mt-10 '>
        Made By Rishi With ❤️
      </footer>
    </div>
  )
}
