import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandinPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import PostJob from './pages/post'
import SavedJob from './pages/saved-job'
import MyJobs from './pages/my-jobs'
import { ThemeProvider } from './components/them-provider'
import ProtectedRoute from './components/protected-route'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [

      {
        path: '/',
        element:
          <LandinPage />

      },
      {
        path: '/onboarding',
        element: <ProtectedRoute>{/* using this costom component to avoid direct login into other pages other than landing page  */}
          <Onboarding />
        </ProtectedRoute>
      },
      {
        path: '/jobs',
        element: <ProtectedRoute> 
          <JobListing />
        </ProtectedRoute>
      },
      {
        path: '/job/:id',
        element: <ProtectedRoute>
          <JobPage />
        </ProtectedRoute>
      },
      {
        path: '/post-job',
        element: <ProtectedRoute>

          <PostJob />
        </ProtectedRoute>
      },
      {
        path: '/saved-jobs',
        element: <ProtectedRoute>
          <SavedJob />
        </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element: <ProtectedRoute>
          <MyJobs />
        </ProtectedRoute>
      },

    ]
  }
])
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
