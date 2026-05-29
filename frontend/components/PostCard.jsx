const PostCard = ({ post, isEditing }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-sm text-gray-500 mb-2">Author: {post.ownerName}</h3>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostCard;
