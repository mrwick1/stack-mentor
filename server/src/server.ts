import app from './app';
import { connectToMongoDB } from './config/mongoConfig';

const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Connect to MongoDB first
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
