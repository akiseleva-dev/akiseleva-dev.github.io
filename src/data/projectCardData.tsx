

export class ProjectCardData {
    title: string;
    largeImage: string;
    smallImage: string;

    constructor(title: string, image: string) {
        this.title = title;
        this.largeImage = image;
        this.smallImage = image;
    }
}