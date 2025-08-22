import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose"; // Import mongoose here

import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import userRoutes from "./routes/users.js";
import helmet from "helmet";
import enquiryRoutes from "./routes/enquiryRoutes.js"

// Load env vars
dotenv.config();

// --- DATABASE CONNECTION & DEBUGGING ---
// All connection logic is now in this file.
const connectDB = async () => {
  try {
    // This console.log MUST appear in your terminal.
    console.log("ATTEMPTING TO CONNECT WITH THIS URI:", process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();
// --- END OF CONNECTION LOGIC ---


// These lines are needed to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(express.json());

// Helmet CSP settings
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

// Enable CORS
app.use(cors({
 origin: 'http://localhost:5173' // Replace with your frontend's URL
}));

// Set the 'uploads' folder as a static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
// ... after other app.use statements for routes
app.use("/api/enquiries", enquiryRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);