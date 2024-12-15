import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import FindJobs from './pages/FindJobs/FindJobs/FindJobs'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import JobDetails from './components/JobDetails/JobDetails'

function App() {
  const routes = createBrowserRouter([
    {path: '/', errorElement: <ErrorPage />, element: <MainLayout />, children: [
      {path: '/', element: <Home />},
      {path: '/findJobs', element: <FindJobs />, loader: () => fetch('http://localhost:5000/jobs')},
      {path: '/findJobs/:category/:id', element: <JobDetails />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
