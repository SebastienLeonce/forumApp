import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import PostDao from '@daos/Post/PostDao.mock';
import { paramMissingError } from '@shared/constants';

const postDao = new PostDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/**
 * Get all posts.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getAllPosts(req: Request, res: Response) {
    const posts = await postDao.getAll();
    return res.status(OK).json({posts});
}


/**
 * Get one post.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getOnePost(req: Request, res: Response) {
    const { id } = req.params;
    const post = await postDao.getOne(Number(id));
    return res.status(OK).json({post});
}


/**
 * Add one post.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOnePost(req: Request, res: Response) {
    const { post } = req.body;
    if (!post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await postDao.add(post);
    return res.status(CREATED).end();
}


/**
 * Update one post.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOnePost(req: Request, res: Response) {
    const { post } = req.body;
    if (!post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    post.id = Number(post.id);
    await postDao.update(post);
    return res.status(OK).end();
}


/**
 * Delete one post.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOnePost(req: Request, res: Response) {
    const { id } = req.params;
    await postDao.delete(Number(id));
    return res.status(OK).end();
}
