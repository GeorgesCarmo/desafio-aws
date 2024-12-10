import { prisma } from '../service/prisma.js';

export const createBook = async (data) => {
    const book = await prisma.book.create({
        data: {
            title: data.title,
            author: data.author,
        },
    });
    return book;
}

export const getAllBooks = async () => {
    const book = await prisma.book.findMany({select: {
        id: true,
        title: true,
        author: true,
        createdAt: true,
        updatedAt: true,
    }});
    return book;
}

export const getBookById = async (id) => {
    const book = await prisma.book.findUnique({
        where: { id },
    });
    return book;
}

export const updateBook = async (id, data) => {
    const book = await prisma.book.update({
        where: { id },
        data,
        select: {
            id: true,
            title: true,
            author: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return book;
}

export const deleteBook = async (id) => {
    await prisma.book.delete({
        where: { id },
    });
    return;
}