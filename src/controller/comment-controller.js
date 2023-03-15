const { Comment, User, Post } = require("../models");
const { validateComment } = require("../validators/comment-validate");
// const createError = require("../utils/create-error");

exports.createComment = async (req, res, next) => {
  try {
    const user = req.user;
    const { comment, postId } = req.body;
    console.log(comment);
    const value = validateComment({ comment: comment });

    await Comment.create({
      title: value.comment,
      userId: user.id,
      postId: postId,
    });

    res.status(200).json({ message: "Create comment complete" });
  } catch (err) {
    next(err);
  }
};

exports.getCommentByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: {
        postId: postId,
      },
      include: {
        model: User,
      },
    });

    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};
