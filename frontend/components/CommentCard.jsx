const CommentCard = ({ comment }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-800">{comment.commentedBy}</p>
        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
