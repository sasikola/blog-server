const Blog = require("../models/Blog");

// to create a blog
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imagePaths = req.files.map((file) => file.path);

    const newBlog = new Blog({
      title,
      content,
      author,
      images: imagePaths,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully.", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// to fetch all blogs

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBlog, getAllBlogs };
