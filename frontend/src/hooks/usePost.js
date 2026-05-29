import axios from "axios"
import { useUser } from "../context/useUserContenxt"
export const usePost = ()=>{
    const {user} = useUser();
    const getAllPost = async(page,limit)=>{
        try{

        const result = await axios.get(`/api/v1/posts?page=${page}&limit=${limit}`)
        return result.data

        }catch(err){
            console.log(err.message)
        }
    }

    const deletePostById = async(id) =>{
        try{
            const result = await axios.delete(`/api/v1/posts/me/${id}`)
            return result
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

    const getPostById = async(id)=>{
        try{
            if(!id){
                console.log("id is missing")
            }
            const result = await axios.get(`/api/v1/posts/me/${id}`)
            return result
        }catch(err){
        console.log(err)
    }
    }

    const createPost = async(title,content)=>{
        try{
            const result = await axios.post(`/api/v1/posts`,{title, content})
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

    const editPost = async({id, title, content})=>{
        try{
            const result = await axios.put(`/api/v1/posts/me/${id}`, {title, content}, {new:true})
            return result
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

    return{getAllPost, getPostById, createPost, editPost, deletePostById}
}