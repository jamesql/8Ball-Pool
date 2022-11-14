import { Vector } from './Vector2D';

export function getCornerPoints(x: number, y: number, width: number, height: number): Vector[] {
    return [
        new Vector(x, y),
        new Vector(x + width, y),
        new Vector(x + width, y + height),
        new Vector(x, y + height)
    ];
};

export function getImage(src: string): HTMLImageElement {
    let image = new Image();
    image.src = src;
    image.addEventListener('load', () => {
        console.log('Image loaded: ' + src);
    });
    return image;
}