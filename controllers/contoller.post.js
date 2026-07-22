import Post from "../models/post.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, status } = req.body;

    const post = await Post.create({
      title,
      content,
      status,
      author: req.user.id,
    });

    return sendSuccess(res, 201, post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const { status, sortBy, order, page, limit } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const sortField = sortBy || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [posts, totalPosts] = await Promise.all([
      Post.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNumber)
        .populate("author", "name email"),
      Post.countDocuments(filter),
    ]);

    return sendSuccess(res, 200, {
      posts,
      pagination: {
        totalPosts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPosts / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");

    if (!post) return sendError(res, 404, "Post not found");

    return sendSuccess(res, 200, post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!post) return sendError(res, 404, "Post not found");

    return sendSuccess(res, 200, post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return sendError(res, 404, "Post not found");

    return sendSuccess(res, 200, post);
  } catch (error) {
    next(error);
  }
};