import { Router } from 'express';
import { verifyToken } from '../controllers/adminController.js';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticlesByPage,
  updateArticle,
} from '../controllers/articleControllers.js';

const articleRoutes = Router();

// Create article
articleRoutes.post('/articles', async (req, res) => {
  try {
    const article = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const admin = verifyToken(token);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const createdArticle = await createArticle(article);

    res.status(201).json(createdArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Read articles
articleRoutes.get('/articles', async (req, res) => {
  try {
    const articles = await getAllArticles();

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

articleRoutes.get('/articles/:page', async (req, res) => {
  const page = parseInt(req.params.page);

  try {
    const articles = await getArticlesByPage(page);
    res.json(articles);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Update article
articleRoutes.put('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const admin = verifyToken(token);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const updatedarticle = await updateArticle(article, +id);

    res.status(201).json(updatedarticle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete articles
articleRoutes.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const admin = verifyToken(token);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const deletedArticle = await deleteArticle(+id);

    res.status(204).json(deletedArticle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default articleRoutes;
