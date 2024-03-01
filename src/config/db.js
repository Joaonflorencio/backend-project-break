const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://joaouser:kSbm5WHNr7R0NKKy@cluster0.rc2ekun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Salir de la aplicación con fallo
    process.exit(1);
  }
};

module.exports = connectDB;