export const basePost = class Post {
    constructor(title, content, comments) {
        this.title = title || '';
        this.content = content || '';
        this.comments = comments || [];
    }
}