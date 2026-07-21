import Comment from "../models/comment.js";
import Post from "../models/post.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const createComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return sendError(res, 404, "Post not found");

    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user.id,
    });

    return sendSuccess(res, 201, comment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { page, limit } = req.query;

    const post = await Post.findById(postId);
    if (!post) return sendError(res, 404, "Post not found");

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [comments, totalComments] = await Promise.all([
      Comment.find({ post: postId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .populate("author", "name email"),
      Comment.countDocuments({ post: postId }),
    ]);

    return sendSuccess(res, 200, {
      comments,
      pagination: {
        totalComments,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalComments / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!comment) return sendError(res, 404, "Comment not found");

    return sendSuccess(res, 200, comment);
  } catch (error) {
    next(error);
  }
};