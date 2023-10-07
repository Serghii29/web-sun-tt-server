import { Router } from 'express';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  updateArticle,
} from '../controllers/articleControllers.js';

const router = Router();

// Create article
router.post('/articles', async (req, res) => {
  const article = req.body;

  try {
    const createdArticle = await createArticle(article);

    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Read articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await getAllArticles();

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update article
router.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const article = req.body;

  try {
    const updatedarticle = await updateArticle(article, +id);

    res.status(201).json(updatedarticle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete articles
router.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await deleteArticle(+id);

    res.status(204).json(deletedArticle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
