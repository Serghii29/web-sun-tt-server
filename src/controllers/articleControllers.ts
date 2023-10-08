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
