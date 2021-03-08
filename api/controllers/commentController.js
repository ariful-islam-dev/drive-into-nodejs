const Comment = require("../../models/Comment")
const Post = require("../../models/Post")

exports.commentPostController = async (req, res, next) => {
    let { postId } = req.params

    let { body } = req.body

    if (!req.user) {
        return res.status(403).json({
            error: `Yor are not an authenticated User`
        })
    }

    let comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try {
        let createdComment = await comment.save()
        await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { 'comments': createdComment._id } }
        )

        let commentJSON = await Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'profilePics username'
        })

        return res.status(201).json(commentJSON)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }


}