import Post from "../models/postModel.js";
export const createPostService = async(title,content,userId,ownerName)=>{
    
    if(!title || !content){
        throw new Error("Please fill all the fields")
    }
    
    const post = await Post.create({
        title,
        content,
        userId,
        ownerName
    })
    return post
}

export const getMyPostService = async (id, page, limit)=>{
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const skip = (pageNumber -1) * limitNumber

    if(!id){
        throw new Error("Unathorized user")
    }

    const posts = await Post.find({userId: id})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limitNumber)

      if(!posts){
        throw new Error("You currently have no post")
    }
    const totalPost = await Post.countDocuments({userId : id})


    return {
       posts,
        pagination:{
            page: pageNumber,
            limit: limitNumber,
            totalPost,
            totalPages: Math.ceil(totalPost / limitNumber)
           },
      
    }
}

export const getPostService = async(postId)=>{

  if(!postId){
    throw new Error("Cannot find post")
  }

    const post = await Post.findById(postId)

    return post
}

export const editPostService = async({id, title, content})=>{

    
    const updatedPost = await Post.findByIdAndUpdate(id, {title, content}, {new:true})
    if(!updatedPost){
      throw new Error("Cannot save changes")
    }

    return updatedPost;

  
}

export const getAllPostService = async (page, limit) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 5;
  const skip = (pageNumber - 1) * limitNumber;

    const posts = await Post.find()
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limitNumber)

  const totalPost = await Post.countDocuments();

  return {
    posts,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalPost,
      totalPages: Math.ceil(totalPost / limitNumber)
    }
  };
};

export const deletePostByIdService = async (id, userId)=>{
 

  const result = await  Post.findOneAndDelete({_id:id, userId: userId})


  return result

}