import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useComment } from "../hooks/useComment";
import { useUser } from "../context/useUserContenxt";
import { useMessage } from "../hooks/useMessage";
import CommentsList from "../../components/CommentsList";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [comment, setComment] = useState()
  const [totalPages, setTotalPages] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);
  const [trigger, setTrigger] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const {getMessage, sendMessage} = useMessage()
  const [text, setText]= useState('')
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, editPost, deletePostById } = usePost();
  const { getComment, createComment } = useComment();
  const [messages, setMessages] = useState([])
  const loggedInUserId = user?._id

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPostById(id);
      setPost(result.data);
      const messages = await getMessage({id:result.data.userId})
      setMessages(messages.messages)
     
    };
    fetchPost();
  }, [id,]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post, trigger]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      const result = await getComment(id, page, 5);
      setComments(result.data.comments);
      setTotalPages(result.data.pagination.totalPages);
      setLoadingComments(false);
    };
    fetchComments();
  }, [id, page, trigger]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await editPost({ id: id, title: title, content: content });
    if (result.data.success === true) {
      alert("Successfully Updated");
      setIsEditing(false);
      setPost({ ...post, title, content });
    }
  };

  const handleCreateComment = async(e)=>{
    e.preventDefault();
    const result = await createComment({postId: id, content: comment})
    setTrigger((t)=>t+1)
    console.log(result);
  }

  const handleDelete = async()=>{
    const result = await deletePostById(id)
    console.log(result)
    if(result.data.success == true){
      alert("Post Deleted")
      navigate("/home")
    }
  }
  const handleSend = async (e)=>{
    e.preventDefault();
    const result = await sendMessage({id:post.userId, text:text})
    console.log(result)
     setText("");

    
    const updatedMessages = await getMessage({ id: post.userId });
    setMessages(updatedMessages.messages);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Edit Button */}
      {post?.userId === user?._id && !isEditing && (
        <div className="text-right">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <form
          onSubmit={handleEditSubmit}
          className="bg-gray-50 p-4 rounded-lg shadow space-y-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Post Card */}
      {post ? (
        <div className="bg-white p-6 rounded-lg shadow space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
          <p className="text-gray-600">{post.content}</p>
          <p className="text-sm text-gray-500">
            Author: {post.ownerName} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading post...</p>
      )}

      {/* Comments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
                <form 
          onSubmit={handleCreateComment} 
          className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full shadow-sm"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="p-2 text-blue-600 hover:text-blue-800 transition">
            <PaperAirplaneIcon className="w-6 h-6 rotate-45" />
          </button>
        </form>
        {loadingComments ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : (
          <CommentsList comments={comments} />
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-md text-white ${
            page <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md text-white ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          Next
        </button>
          
      </div>
      {/* Message Section (Static for now) */}
<div className="bg-white rounded-lg shadow p-4 space-y-4">
  {/* Header */}
  <div className="border-b pb-2">
    <h2 className="text-lg font-semibold text-gray-800">
      Messages
    </h2>
    <p className="text-sm text-gray-500">
      Chat with Author
    </p>
  </div>

  {/* Messages */}
 <div className="h-64 overflow-y-auto space-y-3 px-1">
  {messages.map((msg) => {
    const isMyMessage = msg.senderId === loggedInUserId;

    return (
      <div
        key={msg._id}
        className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`px-4 py-2 rounded-lg max-w-xs ${
            isMyMessage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {msg.text}
        </div>
      </div>
    );
  })}
</div>


  {/* Message Input */}
  <form className="flex items-center gap-2 border-t pt-3"
  onSubmit={handleSend}>
    <input
      type="text"
      placeholder="Type a message..."
      onChange={(e)=>setText(e.target.value)}
      className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      
    >
      <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
    </button>
  </form>
</div>

    </div>
  );
};

export default PostDetail;
