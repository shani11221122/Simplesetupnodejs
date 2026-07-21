import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import Post from "./models/post.js";
import Comment from "./models/comment.js";

dotenv.config();

const statuses = ["draft", "active", "archived"];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("Old data cleared");

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [];
    for (let i = 1; i <= 5; i++) {
      users.push({
        name: `Seed User ${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
        role: i === 1 ? "admin" : "user",
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    const posts = [];
    for (let i = 1; i <= 35; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      posts.push({
        title: `Sample Post ${i}`,
        content: `This is the content body for sample post number ${i}. Used for testing pagination and filters.`,
        status: randomStatus,
        author: randomUser._id,
      });
    }
    const createdPosts = await Post.insertMany(posts);
    console.log(`${createdPosts.length} posts created`);

    const comments = [];
    for (let i = 1; i <= 40; i++) {
      const randomPost = createdPosts[Math.floor(Math.random() * createdPosts.length)];
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      comments.push({
        text: `This is sample comment number ${i}.`,
        post: randomPost._id,
        author: randomUser._id,
      });
    }
    const createdComments = await Comment.insertMany(comments);
    console.log(`${createdComments.length} comments created`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();