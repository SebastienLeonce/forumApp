import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';
import { IPost } from '@entities/Post';


interface IDatabase {
    users: IUser[];
    posts: IPost[];
}


class MockDaoMock {

    private readonly dbFilePath = 'server/daos/MockDb/MockDb.json';


    protected openDb(): Promise<IDatabase> {
        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    }


    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default MockDaoMock;
