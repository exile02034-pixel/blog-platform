import CommentCard from "./CommentCard";

const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
