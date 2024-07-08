const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
