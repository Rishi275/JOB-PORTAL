import Header from '@/components/header'
import '../App.css'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const portfolio = () => {
    window.location.href = "https://rishiai.vercel.app";
};

  return (
    <div>
      <div className='background'></div>
      <main className='min-h-screen container'>
        <Header />
        <Outlet />
      </main>
      <footer className='p-10 text-center bg-gray-800 mt-10 '>
        Made By <span className='text-gray-300 font-bold underline cursor-pointer' onClick={portfolio}>Rishi</span> With ❤️
      </footer>
    </div>
  )
}
