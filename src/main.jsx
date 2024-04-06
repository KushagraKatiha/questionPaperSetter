import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// Create react router for routing of the pages
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import QuestionSetter from './Components/QuestionSetter.jsx'
import QuestionPaper from './Components/QuestionPaper.jsx'
import App from './App.jsx'
import EditQuestion from './Components/EditQuestion.jsx'
import EditQuestionTwo from './Components/EditPageTwo.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route path='/' element={<QuestionSetter/>}/>
      <Route path='format' element={<QuestionPaper/>}/>
      <Route path='edit-page' element={<EditQuestion/>}/>
      <Route path='edit-page-2' element={<EditQuestionTwo/>}/>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
