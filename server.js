const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/teamDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Schema and Model
const teamSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
});

const TeamMember = mongoose.model('TeamMember', teamSchema);

// CRUD API Routes
// Get all team members
app.get('/api/team', async (req, res) => {
  const team = await TeamMember.find();
  res.json(team);
});

// Add a new team member
app.post('/api/team', async (req, res) => {
  const newMember = new TeamMember(req.body);
  await newMember.save();
  res.status(201).json(newMember);
});

// Update a team member
app.put('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  const updatedMember = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedMember);
});

// Delete a team member
app.delete('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  await TeamMember.findByIdAndDelete(id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

