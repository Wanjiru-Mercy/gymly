import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import memberRoutes from './routes/memberRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import planRoutes from './routes/planRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import biometricSignInRoutes from './modules/biometric-signin/index.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/biometric', biometricSignInRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gymly API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
