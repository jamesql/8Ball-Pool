import { Vector } from './Vector2D';

export interface Sprite {
    visible: boolean
    image: HTMLImageElement
    location: Vector

    show(): void
    hide(): void
    init(): void
    update(): void
}