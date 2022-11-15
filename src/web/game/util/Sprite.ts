import { Vector } from './Vector2D';

export interface Sprite {
    visible: boolean
    image: HTMLImageElement
    location: Vector

    setVisible(_visible: boolean): void
    show(): void
    init(): void
    update(self: any): void
}