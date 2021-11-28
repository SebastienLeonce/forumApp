export interface IPost {
    id: number;
    title: string;
    content: string;
    author: string;
    description: string;
    avatar: string;
    href: string;
}

export class Post implements IPost {

    public id: number;
    public title: string;
    public content: string;
    public author: string;
    public description: string;
    public avatar: string;
    public href: string;


    constructor(
        titleOrUser?: string | IPost,
        content?: string,
        author?: string,
        description?: string,
        avatar?: string,
        href?: string,
        id?: number,
    ) {
        if (typeof titleOrUser === 'string' || typeof titleOrUser === 'undefined') {
            this.title = titleOrUser || '';
            this.content = content || '';
            this.author = author || '';
            this.description = description || '';
            this.avatar = avatar || '';
            this.href = href || '';
            this.id = id || -1;
        } else {
            this.title = titleOrUser.title;
            this.content = titleOrUser.content;
            this.author = titleOrUser.author;
            this.description = titleOrUser.description;
            this.avatar = titleOrUser.avatar;
            this.href = titleOrUser.href;
            this.id = titleOrUser.id;
        }
    }
}