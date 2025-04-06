import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Layout from './Layout.jsx';
import Github from './components/Github/Github.jsx';
import LeetCode from './components/LeetCode/LeetCode.jsx';
import Sample from './components/Sample/Sample.jsx'

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        {/* <Route path='' element={<App/> }/> */}
        <Route path="/leetcode/:username" element={<LeetCode />} />
        <Route path="/github/:username" element={<Github />} />
        <Route path="/sample/:username" element={<Sample />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
