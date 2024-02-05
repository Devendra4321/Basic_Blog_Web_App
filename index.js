const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let blogs = [
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "About AI",
    authorname: "Devendra Bhole",
    blog: "AI is very powerful in now a days.",
  },
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "Machine Learning Basics",
    authorname: "Devendra Bhole",
    blog: "Understanding the fundamentals of machine learning.",
  },
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "Deep Learning Applications",
    authorname: "Devendra Bhole",
    blog: "Exploring the diverse applications of deep learning.",
  },
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "AI Ethics",
    authorname: "Devendra Bhole",
    blog: "Examining the ethical considerations in AI development.",
  },
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "Future of AI",
    authorname: "Devendra Bhole",
    blog: "Predicting the exciting possibilities of AI in the future.",
  },
  {
    id: uuidv4(),
    username: "devendra@123",
    blogtopic: "AI in Healthcare",
    authorname: "Devendra Bhole",
    blog: "Analyzing the transformative impact of AI in the healthcare sector.",
  },
];

//main route
app.get("/blogs", (req, res) => {
  res.render("index.ejs");
});

//to show route
app.get("/blogs/show", (req, res) => {
  res.render("view.ejs", { blogs });
});

//to create blog
app.get("/blogs/new", (req, res) => {
  res.render("new.ejs");
});

//to handel data from create route
app.post("/blogs", (req, res) => {
  let { username, blogtopic, authorname, blog } = req.body;
  let id = uuidv4();
  blogs.push({ id, username, blogtopic, authorname, blog });
  res.redirect("/blogs");
});

////to show the blog with valid id
app.get("/blogs/:id", (req, res) => {
  let { id } = req.params;
  let blog = blogs.find((b) => id === b.id);
  res.render("show.ejs", { blog });
});

//route for update blog
app.patch("/blogs/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.blog;
  // console.log(newContent);
  let blog = blogs.find((b) => id === b.id);
  blog.blog = newContent;
  res.redirect("/blogs/show");
});

//route for edit blog
app.get("/blogs/:id/edit", (req, res) => {
  let { id } = req.params;
  let blog = blogs.find((b) => id === b.id);
  res.render("edit.ejs", { blog });
});

//delete blog route
app.delete("/blogs/:id", (req, res) => {
  let { id } = req.params;
  blogs = blogs.filter((b) => id !== b.id);
  res.redirect("/blogs/show");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
