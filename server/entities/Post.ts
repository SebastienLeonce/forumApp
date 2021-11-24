export interface IPost {
    id: number;
    title: string;
    content: string;
    author: string;
}

export class Post implements IPost {

    public id: number;
    public title: string;
    public content: string;
    public author: string;


    constructor(
        titleOrUser?: string | IPost,
        content?: string,
        author?: string,
        id?: number,
    ) {
        if (typeof titleOrUser === 'string' || typeof titleOrUser === 'undefined') {
            this.title = titleOrUser || '';
            this.content = content || '';
            this.author = author || '';
            this.id = id || -1;
        } else {
            this.title = titleOrUser.title;
            this.content = titleOrUser.content;
            this.author = titleOrUser.author;
            this.id = titleOrUser.id;
        }
    }
}