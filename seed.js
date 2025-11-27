const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config(); // Load .env file

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      console.log('DB Connected. Seeding...');

      // Check if admin exists
      const adminExists = await User.findOne({ email: 'admin@test.com' });
      if (adminExists) {
          console.log('Admin already exists.');
          process.exit();
      }

      // Create Admin
      const hash = await bcrypt.hash('admin123', 10);
      await User.create({
          name: 'Super Admin',
          email: 'admin@test.com',
          password: hash,
          role: 'admin'
      });

      console.log('SUCCESS: Admin created (admin@test.com / admin123)');
      process.exit();
  })
  .catch(err => {
      console.error(err);
      process.exit(1);
  });