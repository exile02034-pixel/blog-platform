import axios from 'axios'
export const useComment = ()=>{

    const getComment = async(postId, page, limit)=>{
        try{
            if(!postId){
                console.log("Missing id")
            }
          const comment = await axios.get(`/api/v1/comments/post/${postId}?page=${page}&limit=${limit}`) 
          return comment 
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
    const createComment = async({postId, content})=>{
        try{
            if(!postId){
                console.log('Missing ID')
            }
            const result = await axios.post(`/api/v1/comments/post/${postId}`, {content})
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
    return {getComment, createComment}
}