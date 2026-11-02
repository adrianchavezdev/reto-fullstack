module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError')
    return res.status(400).json({ mensaje: Object.values(err.errors).map(e => e.message).join(', ') });
  if (err.code === 11000)
    return res.status(400).json({ mensaje: 'El email ya está registrado' });
  if (err.name === 'CastError')
    return res.status(400).json({ mensaje: 'ID inválido' });
  res.status(err.status || 500).json({ mensaje: err.message || 'Error del servidor' });
};