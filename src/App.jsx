import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import FindJobs from './pages/FindJobs/FindJobs/FindJobs'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import JobDetails from './components/JobDetails/JobDetails'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'

function App() {
  const routes = createBrowserRouter([
    {path: '/', errorElement: <ErrorPage />, element: <MainLayout />, children: [
      {path: '/', element: <Home />},
      {path: '/findJobs', element: <FindJobs />, loader: () => fetch('http://localhost:5000/jobs')},
      {path: '/findJobs/:category/:id', element: <JobDetails />, loader: ({params}) => fetch(`http://localhost:5000/findJobs/${params.category}/${params.id}`)},
      {path: '/signIn', element: <SignIn />},
      {path: '/signUp', element: <SignUp />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
