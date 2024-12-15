import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import FindJobs from './pages/FindJobs/FindJobs/FindJobs'

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <MainLayout />, children: [
      {path: '/', element: <Home />},
      {path: '/findJobs', element: <FindJobs />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
