

export class ProjectCardData {
    id: number;
    shortTitle: string;
    title: string;
    largeImage: string;
    smallImage: string;
    text: string;

    constructor(id: number, shortTitle: string, title: string, image: string, text: string) {
        this.id = id;
        this.shortTitle = shortTitle;
        this.title = title;
        this.largeImage = image;
        this.smallImage = image;
        this.text = text;
    }
}