import { createPostService, deletePostByIdService, editPostService, getAllPostService, getMyPostService, getPostService } from "../services/postService.js"

export const createPost = async(req, res)=>{
    try{
        const userId = req.user._id
        const ownerName = req.user.fullName
        const{title,content} = req.body

        const result = await createPostService(title, content, userId, ownerName)
        if(!result){
            return res.status(404).json({
                message:"Something went wrong"
            })
        } 
        return res.status(201).json({
            sucess:true,
            post:{
                title:result.title,
                content:result.content,
                postOwner:result.ownerName,
                createdAt : result.createdAt
            }
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const deletePostById = async(req, res)=>{
  try{ 
      const userId = req.user._id
      const {id} = req.params
      console.log(id)
      const result = await deletePostByIdService(id, userId)
      return res.status(200).json({
        success:true,
        result
      })
  }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const getMyPost = async(req, res)=>{
    try{
        const id = req.user._id
        const{page, limit} = req.query

        const result = await getMyPostService(id, page, limit)
        
       
        return res.status(201).json({
            sucess:true,
            data: result.posts,
            pagination:result.pagination
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const getPost = async(req, res)=>{
    try{
        const {id} = req.params
        const data = await getPostService(id)


        return res.status(200).json(data)
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const getAllPost = async (req, res)=>{
    try{
        const{page,limit} = req.query
        const result = await getAllPostService(page, limit)

     return res.status(200).json({
      success: true,
      data: result.posts,
      pagination: result.pagination
    });
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const editPost = async (req, res)=>{
    try{
        const {id} = req.params
        const {title, content} = req.body
        const result = await editPostService({id, title, content})

        return res.status(201).json({
          success:true,
          result
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}