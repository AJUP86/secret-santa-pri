const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/comments', commentRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
