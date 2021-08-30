import mongoose from 'mongoose';

const { model, Schema } = mongoose;

// Cómo asociar el ID del usuario.
// Cómo declarar una imagen...
// Cómo funciona en typeScript...

const bookSchema = Schema({
  name: String,
  image: String,
  stories: [{
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    status: String,
  }],
});

const Book = model('Book', bookSchema);
export default Book;
