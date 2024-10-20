const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// definir esquema de nuestro modelo

const userSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  },
  fechaCreacion: { 
    type: Date,
    default: Date.now,
 }
});

module.exports = mongoose.model("User", userSchema);