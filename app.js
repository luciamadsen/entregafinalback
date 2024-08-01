const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminView = require('./views/adminView');
const swaggerApp = require('./swagger');
const logger = require('./utils/logger');

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/admin', adminView);
app.use('/api-docs', swaggerApp);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
