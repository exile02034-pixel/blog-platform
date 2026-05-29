import axios from "axios"
export const useAuth = ()=>{
    const signIn = async (userName,password)=>{
        try{
            const result = await axios.post('/api/v1/auth/signin',{userName,password}, {withCredentials:true})
            return result.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
    }

    const signUp = async(fullName, userName,password)=>{
        try{
            const result = await axios.post('/api/v1/auth/signup', {fullName,userName,password})
            return result.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
    }
    
    const getMe = async()=>{
        try{
            const result = await axios.get('/api/v1/auth/me', {withCredentials:true})
            return result.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
    }


    const signOut = async() =>{
        try{
            const result = await axios.post('/api/v1/auth/signout')
            return result.data
        }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
       }
       else if(error.request){
         console.log("Backend error message:", error.request);
       }
       else{
        console.log("error", error.message)
       }
    }
    }

    
  const uploadProfile = async(file) =>{
    try{
        const formData = new FormData();
        formData.append("file", file);

        const result = await axios.post('/api/v1/auth/me/upload-pfp', formData)
        return result.data
    }catch(error){
       if(error.response){
          console.log("Backend error message:", error.response.data.message);
        }
        else if(error.request){
          console.log("Backend error message:", error.request);
        }
        else{
         console.log("error", error.message)
        }
    }
  }
    
    return {signIn, signOut, signUp, getMe, uploadProfile}
}