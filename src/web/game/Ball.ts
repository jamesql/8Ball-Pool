import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import { ballType } from './util/Types';

export class Ball implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    type: ballType;

    constructor() {
    }

    show(): void {
        throw new Error('Method not implemented.');
    }
    hide(): void {
        throw new Error('Method not implemented.');
    }
    init(): void {
        throw new Error('Method not implemented.');
    }
    update(): void {
        throw new Error('Method not implemented.');
    }

}