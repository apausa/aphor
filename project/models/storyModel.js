import mongoose from 'mongoose';

// Cómo asociar el ID del usuario.
// Cómo asociar el ID del libro.
// Cómo declarar una imagen...
// Cómo funciona en typeScript...

const { model, Schema } = mongoose;
const storySchema = Schema({
  body: String,
  date: Date,

});

const Story = model('Story', storySchema);
export default Story;
