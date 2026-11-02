const router = require('express').Router();
const Tarea = require('../models/Tarea');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try { res.json(await Tarea.find().sort({ createdAt: -1 })); }
  catch (err) { next(err); }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const tarea = await Tarea.create({ ...req.body, usuario: req.user.id });
    res.status(201).json(tarea);
  } catch (err) { next(err); }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body,
      { new: true, runValidators: true });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (err) { next(err); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (err) { next(err); }
});

module.exports = router;