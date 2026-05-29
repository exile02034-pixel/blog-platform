import { useState, useEffect } from "react";
import { usePost } from "../hooks/usePost";
import PostCard from "../../components/postCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const [allPost, setAllPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pfpURL, setPfpURL] = useState(null); // For displaying PFP

  const { signOut, uploadProfile, user } = useAuth();
  const { getAllPost } = usePost();
  const navigate = useNavigate();

  // Fetch posts
  const fetchAllPost = async () => {
    const result = await getAllPost(page, 2);
    setAllPost(result.data);
    setTotalPages(result.pagination.totalPages);
  };

  useEffect(() => {
    fetchAllPost();
  }, [page]);

 
  useEffect(() => {
    if (user?.profilePicture) setPfpURL(user.profilePicture);
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    alert("Successfully logged out");
    navigate("/");
  };

  // Create post
  const handleCreate = () => {
    navigate("/addpost");
  };

  // Upload PFP
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadProfile(file);
      console.log("Upload result:", result.data.profilePicture);
      setPfpURL(result.data.profilePicture);
      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl relative">
        <div className="max-w-5xl mx-auto px-6 py-16 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
              All About Blog
            </h1>
            <p className="text-blue-100 text-lg">
              Discover stories, insights, and inspiration
            </p>
          </div>

          {/* Profile Picture */}
          <div className="relative">
            <label htmlFor="pfp-upload">
              <img
                src={pfpURL || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-white object-cover cursor-pointer shadow-lg"
                title="Click to change profile picture"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full text-white font-semibold">
                  Uploading...
                </div>
              )}
            </label>
            <input
              type="file"
              id="pfp-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <ul className="space-y-6">
          {allPost.map((post) => (
            <li
              key={post._id}
              className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => navigate(`/post-detail/${post._id}`)}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <PostCard post={post} />
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            ← Prev
          </button>

          <div className="px-5 py-2 bg-white rounded-lg shadow-md border border-gray-200">
            <span className="text-gray-600 font-medium">
              Page <span className="text-blue-600 font-bold">{page}</span> of{" "}
              <span className="text-gray-800 font-bold">{totalPages}</span>
            </span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            Next →
          </button>
        </div>

        {/* Create / Sign Out */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Post
          </button>

          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
