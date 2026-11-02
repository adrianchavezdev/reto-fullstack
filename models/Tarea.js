const mongoose = require('mongoose');
module.exports = mongoose.model('Tarea', new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '' },
  completada: { type: Boolean, default: false },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));