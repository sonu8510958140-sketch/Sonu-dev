
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import Home from './Component/Home'
import Navbar from './Component/Navbar'
import Hotels from './Component/Hotels'
import MyBooking from './Component/Mybooking'
import About from './Component/About'
import './App.css'

function Layout() {


  return (
    <>
    <Navbar/>
    
   
    <Outlet/>

    </>
  )
}

const router =createBrowserRouter([
  {path:"/",
    element:<Layout/>,
      children:[
        {index:true,element:<Home/>},
        {path:"/Hotels",element:<Hotels/>},
        {path:"/MyBooking",element:<MyBooking/>},
        {path:"/About",element:<About/>}
      ]
  }

])
function App() {


  return (
  <RouterProvider router={router}/>
  )
}





export default App
