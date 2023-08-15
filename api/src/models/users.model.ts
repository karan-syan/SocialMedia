import bcrypt from "bcrypt";
import {
  CallbackWithoutResultAndOptionalError,
  Model,
  Schema,
  model,
} from "mongoose";
interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  coverPic: string;
  profilePic: string;
  follower: Schema.Types.ObjectId;
  following: Schema.Types.ObjectId;
  posts: Schema.Types.ObjectId;
}
interface IUserMethods {
  matchPassword: (password: string) => boolean;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    maxLength: 50,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    maxLength: 50,
    minLength: 2,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  coverPic: {
    type: String,
    maxLength: 100,
  },
  profilePic: {
    type: String,
    maxLength: 100,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
});
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
UserSchema.methods.matchPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
export const Users = model("Users", UserSchema);
