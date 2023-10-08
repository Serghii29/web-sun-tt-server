import { Router } from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js';

const adminRoutes = Router();

//Register admin
adminRoutes.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const registeredUser = await registerAdmin(user);
    res.status(201).json(registeredUser);
  } catch (error) {
    res.status(500).send('Error registering admin');
  }
});

// Login admin and get token
adminRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const token = await loginAdmin(username, password);

  if (token) {
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

export default adminRoutes;
