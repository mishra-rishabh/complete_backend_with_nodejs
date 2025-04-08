import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Enquiry from './Enquiry.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <h1 className='font-bold text-[40px]'>Hello World!</h1> */}
    <Enquiry/>
  </StrictMode>,
)
