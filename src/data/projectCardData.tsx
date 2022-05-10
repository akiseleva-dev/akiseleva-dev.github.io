

export class ProjectCardData {
    id: number;
    title: string;
    largeImage: string;
    smallImage: string;
    text: string;

    constructor(id: number, title: string, image: string, text: string) {
        this.id = id;
        this.title = title;
        this.largeImage = image;
        this.smallImage = image;
        this.text = text;
    }
}