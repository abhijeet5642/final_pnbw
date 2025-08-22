import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Assuming you use bcrypt for password hashing

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      // --- THIS IS THE CRITICAL FIX: 'customer' MUST be in this array ---
      enum: ['admin', 'customer', 'agent'], // Ensure 'customer' is an allowed role
      default: 'customer', // Default role for new registrations
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    // --- Added for Password Reset Functionality ---
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// --- Middleware to hash password before saving ---
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;