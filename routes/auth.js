const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    await User.create({ nombre, email, password });
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.compararPassword(password)))
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    const token = jwt.sign({ id: user._id, nombre: user.nombre },
      process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.json({ token, nombre: user.nombre });
  } catch (err) { next(err); }
});

module.exports = router;