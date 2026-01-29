import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
     type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
 
  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default mongoose.models["User"] || mongoose.model("User", userSchema);
