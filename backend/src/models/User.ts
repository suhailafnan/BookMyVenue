import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email address."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "A user must have a password."],
      minlength: [6, "Password must be at least 6 characters long."],
      select: false, // Prevents returning password hash in standard selects
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password securely if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Instance method to compare input passwords with standard stored hash
userSchema.methods.comparePassword = async function (
  candidate: string,
  userHash: string
): Promise<boolean> {
  return bcrypt.compare(candidate, userHash);
};

export const User = mongoose.model<IUser>("User", userSchema);
