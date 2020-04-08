const express = require("express");
const { uuid } = require("uuidv4")
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
  return res.json(repositories)
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return res.json(repository)
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params
  const { url, title, techs } = req.body

  const repositoriesIndex = repositories.find(
    (repository) => repository.id === id
  )

  if (repositoriesIndex < 0) {
    return res.status(400).json({ error: 'Invalid repository ID' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repositoriesIndex] = repository

  return res.status(400).json(repository)
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id
  )

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: 'Project not found.' });
  }

  repositories.splice(repositoryIndex, 1)

  return res.status(204).send()
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params

  const repository = repositories.find(
    (repository) => repository.id === id
  )

  if (!repository) {
    return res.status(400).send()
  }

  repository.likes += 1

  return res.json(repository)
});

module.exports = app;
