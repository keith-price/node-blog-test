const express = require("express");

const router = express.Router();

const Post = require("../models/Post");

// GET
// HOME
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Node Blog",
      description: "Simple Blog to Test Node and EJS",
    };

    const perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;

    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.error(error);
  }
});

// // HOME backup
// router.get("", async (req, res) => {
//   const locals = {
//     title: "Node Blog",
//     description: "Simple Blog to Test Node and EJS",
//   };

//   try {
//     const data = await Post.find();
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;

// function here is just to insert test data
// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Testing the Node Mongo Blog",
//       body: "This is the content to go into the body of the blog. It's not much at the moment but will become more complex, I promise.",
//     },
//     {
//       title: "Testing the Node Mongo Blog 2",
//       body: "This is the content to go into the body of the blog. It's not much at the moment but will become more complex, I promise.",
//     },
//     {
//       title: "Testing the Node Mongo Blog 3",
//       body: "This is the content to go into the body of the blog. It's not much at the moment but will become more complex, I promise.",
//     },
//     {
//       title: "Testing the Node Mongo Blog 4",
//       body: "This is the content to go into the body of the blog. It's not much at the moment but will become more complex, I promise.",
//     },
//   ]);
// }

// insertPostData();
