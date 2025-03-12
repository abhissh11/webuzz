import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avtar: {
      type: String,
      default:
        "https://assambidhansabha.org/assets/uploads/mla/profilepic/member_145.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
