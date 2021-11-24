import { IPost } from '@entities/Post';



export interface IPostDao {
    getOne: (title: string) => Promise<IPost | null>;
    getAll: () => Promise<IPost[]>;
    add: (post: IPost) => Promise<void>;
    update: (post: IPost) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class PostDao implements IPostDao {


    /**
     * @param email
     */
    public getOne(title: string): Promise<IPost | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IPost[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param post
     */
    public async add(post: IPost): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param post
     */
    public async update(post: IPost): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default PostDao;
