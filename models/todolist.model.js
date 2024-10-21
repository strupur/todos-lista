const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const todolistSchema = new Schema({
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

module.exports = mongoose.model("Todo", todolistSchema);