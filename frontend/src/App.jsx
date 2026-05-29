import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function App() {

  const navigate = useNavigate();

  //para sa state lol
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const{signIn, signUp, } = useAuth();

  const handleSignIn = async(e)=>{
    e.preventDefault();
      const result = await signIn(userName, password)
      if(result){
        navigate('/home')
      }
     
  }

  
  const handleSignUp = async(e) =>{
    e.preventDefault();
    const result = await signUp(fullName,userName,password)

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">

        <form 
          onSubmit={handleSignIn}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Sign In
          </h1>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="username0203"
              onChange={(e)=>setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="*****"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <form 
          onSubmit={handleSignUp}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Sign Up
          </h1>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e)=>setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="username0203"
              onChange={(e)=>setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="*****"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

      
        <div className="md:col-span-2 flex justify-center">
      
        </div>

      </div>
    </div>
  )
}

export default App
