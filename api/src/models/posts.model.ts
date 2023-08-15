import { Schema, model } from "mongoose";

const PostsSchema = new Schema({
  caption: String,
  image: {
    public_id: String,
    url: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  likes: [
    {
      users: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
  comments: [
    {
      users: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Posts = model("Posts", PostsSchema);
