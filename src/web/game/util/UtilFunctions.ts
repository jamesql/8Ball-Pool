import { Vector } from './Vector2D';

// get the corner points of a rectangle
export function getCornerPoints(x: number, y: number, width: number, height: number): Vector[] {
    return [
        new Vector(x, y),
        new Vector(x + width, y),
        new Vector(x + width, y + height),
        new Vector(x, y + height)
    ];
};

// get image from assets folder
export function getImage(src: string): HTMLImageElement {
    let image = new Image();
    image.src = src;
    return image;
}