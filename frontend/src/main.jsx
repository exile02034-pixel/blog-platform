import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
//IMPORT FOR PAGES HEHE
import App from './App.jsx'
import Home from './pages/home.jsx'
import PostDetail from './pages/PostDetail.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import ProtectedRoute from '../components/protectedRoute.jsx'
import { AuthProvider } from './context/useUserContenxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/post-detail/:id' element={<ProtectedRoute><PostDetail/></ProtectedRoute>}/>
      <Route path='/addpost' element={<AddPost/>}/>
      <Route path='/editpost/:id' element={<AddPost/>}/>
    </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
