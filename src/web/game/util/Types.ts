import { Vector } from './Vector2D';
export interface _graphics {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
};

export interface _button {
    id: string,
    points: Vector[],
    onClick: () => void,
    active: boolean
};

export interface _key {
    key: string,
    onDown: (any) => void,
    active: boolean,
    obj: any
}

export interface _asset {
    id: string,
    src: string
}

export interface _listener {
    id: string,
    function: (self: any) => void,
    active: boolean
    self: any
}

export interface _shotReplay {
    _cuePosition: Vector,
    _cueAngle: number,
    _cuePower: number,
    _ballPosition: Vector,
    _ballVelocity: Vector
}

export interface _lobby {
    oppponent: string,
    slots: number
    players: number
}

export type ballType = "cue" | "solid" | "stripe" | "eight";
export type playerColor = "stripe" | "solid" | "none";
export type railType = "top" | "bottom" | "left" | "right";

export type shotResult = "miss" | "hit" | "pocket" | "foul";