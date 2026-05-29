import { useState } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { createPost } = usePost();
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await createPost( title, content );
    if(result.sucess === true){
        alert("Post Created")
        navigate("/home")
    }
    console.log(result);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add a New Post
      </h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="My Favorite Book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Content</label>
          <textarea
            placeholder="One of my favorite books is LOTM..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
