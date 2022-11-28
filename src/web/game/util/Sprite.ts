import { Vector } from './Vector2D';

// sprite interface
export interface Sprite {
    visible: boolean
    image: HTMLImageElement
    location: Vector

    setVisible(_visible: boolean): void
    show(): void
    init(): void
    // called everyframe
    // self is used because i forgot that i could just use
    // .bind this should be changed at some point
    update(self: any): void
}