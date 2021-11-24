import { IPost } from '@entities/Post';
import { getRandomInt } from '@shared/functions';
import { IPostDao } from './PostDao';
import MockDaoMock from '../MockDb/MockDao.mock';



class PostDao extends MockDaoMock implements IPostDao {


    public async getOne(id: number): Promise<IPost | null> {
        const db = await super.openDb();
        for (const post of db.posts) {
            if (post.id === id) {
                return post;
            }
        }
        return null;
    }


    public async getAll(): Promise<IPost[]> {
        const db = await super.openDb();
        return db.posts;
    }


    public async add(post: IPost): Promise<void> {
        const db = await super.openDb();
        post.id = getRandomInt();
        db.posts.push(post);
        await super.saveDb(db);
    }


    public async update(post: IPost): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === post.id) {
                db.posts[i] = post;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Post not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Post not found');
    }
}

export default PostDao;
