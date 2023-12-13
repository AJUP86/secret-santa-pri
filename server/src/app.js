const express = require('express');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
