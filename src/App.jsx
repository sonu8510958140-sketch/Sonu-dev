<<<<<<< HEAD

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

=======
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const[showbtn, setShowBtn] = useState(true)
  const[todos,settodos]=useState([
    {
      title:'Good moring',
      desc:"I am sonu"
    },
    {
      title:'Good afternoon',
      desc:"web developer"
    },
    {
      title:'Good evening',
      desc:"Fronend developer"
    },
  ])
  const Todos =({todo})=>{return(<>
  <div className='m-5  border-1 border-pink-600' >
  <div className='todo'>{todo.title}</div>
  <div className='todo'>{todo.desc}</div>
  </div>
  </>)}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        
        {showbtn?<button>I have a button is click</button>:<button>show btn is false</button>}
        {/* {showbtn && <button>I have your button cliclon</button>} */}
        <button
          type="button"
          className="counter"
          onClick={() => setShowBtn(!showbtn)}
        >
          Count is {count}
        </button>
        {todos.map(todo=>{
          return 
          <Todos  key={todo.title} todo ={todo}/>

        })}

      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
>>>>>>> 940b92dbdb5d51bf4fd15e882390c395dda9e2d5
    </>
  )
}

<<<<<<< HEAD
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





=======
>>>>>>> 940b92dbdb5d51bf4fd15e882390c395dda9e2d5
export default App
