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
    _relative: Vector,
    _cueAngle: number,
    _cuePower: number,
    _cueBallVelocity: Vector
}

export interface LobbyState {
    id: string;
    host: string;
    opponent: string;
    state: "waiting" | "playing";
    p_turn: "host" | "opponent";
    h_type: "solid" | "stripe" | "none";
    o_type: "solid" | "stripe" | "none";
}

export type ballType = "cue" | "solid" | "stripe" | "eight" | "open";
export type railType = "top" | "bottom" | "left" | "right";

export type shotResult = "miss" | "hit" | "pocket" | "foul";