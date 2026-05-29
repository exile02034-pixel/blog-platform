import axios from 'axios'

export const useMessage = ()=>{

    const getMessage = async({id})=>{
        try{
            if(!id){
                console.log("id doesnt exist")
            }

            const result = await axios.get(`/api/v1/message/${id}`)
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

    const sendMessage = async({id, text})=>{
        try{
            if(!id){
                console.log("Missing id")
            }
            const result = await axios.post(`/api/v1/message/${id}`, {text})

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
    return {getMessage, sendMessage}
}