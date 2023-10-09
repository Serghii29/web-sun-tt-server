/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create article
export const createArticle = async (article: Article): Promise<Article> => {
  try {
    return await prisma.article.create({
      data: article,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Read articles
export const getAllArticles = async (): Promise<Article[] | undefined> => {
  try {
    const articles = await prisma.article.findMany();

    return articles;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getArticlesByPage = async (
  page: number,
  pageSize: number = 6,
): Promise<Article[] | undefined> => {
  try {
    const offset = (page - 1) * pageSize;

    const articles = await prisma.article.findMany({
      take: pageSize,
      skip: offset,
      orderBy: { id: 'desc' },
    });

    return articles;
  } catch (error) {
    throw new Error('Error retrieving articles by page');
  }
};

export const getLastestNews = async (): Promise<Article[] | undefined> => {
  try {
    const articles = await prisma.article.findMany({
      take: 3,
      orderBy: { id: 'desc' },
    });

    return articles;
  } catch (error) {
    throw new Error('Error retrieving latest news');
  }
};

export const getRandomArticle = async (): Promise<Article | null> => {
  try {
    const articlesCount = await prisma.article.count();
    const randomId = Math.floor(Math.random() * articlesCount);

    const randomUniqueRow = await prisma.article.findFirst({
      where: { id: randomId },
    });

    return randomUniqueRow;
  } catch (error) {
    throw new Error('Error fetching random articles from the database');
  }
};

export const getCountArticles = async () => {
  try {
    const productsCount = await prisma.article.count();

    return productsCount;
  } catch (error) {
    throw new Error('Error the database');
  }
};

// Update article
export const updateArticle = async (
  article: Article,
  id: number,
): Promise<Article | undefined> => {
  try {
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: article,
    });

    if (updatedArticle) {
      return updatedArticle;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Delete article
export const deleteArticle = async (
  id: number,
): Promise<Article | undefined> => {
  try {
    const deletedArticle = await prisma.article.delete({
      where: { id },
    });

    return deletedArticle;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
