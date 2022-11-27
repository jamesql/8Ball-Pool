import { Ball } from './Ball';
import { Canvas } from './Graphics';
import { getImage } from './util/UtilFunctions';
import { Pocket } from './Pocket';
import { Player } from './Player';
import { Cue } from './Cue';
import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import EventLoop from './util/EventLoop';
import { _listener, ballType } from './util/Types';
import { Rail } from './Rail';
import { Physics } from './util/Physics';

export default class Table implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;

    private _balls: Ball[] = [];
    private _pockets: Pocket[] = [];
    private _players: Player[] = [];
    private _rails: Rail[] = [];
    private _currentPlayer: Player;
    private _cue: Cue;
    private _event: _listener;


    constructor() {
        console.log("Table created");
        this.init();
        this.createRails();
        this.rackBalls();
        this.createPockets();
        this._cue = new Cue();
    }

    public rackBalls() {
        this._balls.push(new Ball(new Vector(475, 475), "cue"));
        this._balls.push(new Ball(new Vector(1145,475), "solid"));
        this._balls.push(new Ball(new Vector(1145+35, 475+20), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35, 475-20), "solid"));
        this._balls.push(new Ball(new Vector(1145+35*2, 475+40), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*2, 475), "eight"));
        this._balls.push(new Ball(new Vector(1145+35*2, 475-40), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*3, 475+60), "solid"));
        this._balls.push(new Ball(new Vector(1145+35*3, 475+20), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*3, 475-20), "solid"));
        this._balls.push(new Ball(new Vector(1145+35*3, 475-60), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*4, 475+80), "solid"));
        this._balls.push(new Ball(new Vector(1145+35*4, 475+40), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*4, 475), "solid"));
        this._balls.push(new Ball(new Vector(1145+35*4, 475-40), "stripe"));
        this._balls.push(new Ball(new Vector(1145+35*4, 475-80), "solid"));
    }

    public createRails() {
        this._rails.push(new Rail(195, 130, 570, 25, "top"));
        this._rails.push(new Rail(850, 130, 570, 25, "top"));
        this._rails.push(new Rail(204, 789, 570, 25, "bottom"));
        this._rails.push(new Rail(850, 789, 570, 25, "bottom"));
        this._rails.push(new Rail(140, 180, 25, 570, "left"));
        this._rails.push(new Rail(1450, 180, 25, 570, "right"));
    }

    public createPockets() {
        this._pockets.push(new Pocket(140, 115, "corner"));
        this._pockets.push(new Pocket(810, 93, "middle"));
        this._pockets.push(new Pocket(140, 819, "corner"));
        this._pockets.push(new Pocket(810, 840, "middle"));
        this._pockets.push(new Pocket(1480, 130, "corner"));
        this._pockets.push(new Pocket(1480, 815, "corner"));
    }

    public getCue() : Cue {
        return this._cue;
    }
    
    public getCueBall() : Ball {
        return this._balls[0]; // should change this to be more dynamic
    }

    public isBallInPocket(_b: Ball): boolean {
        for (let i = 0; i < this._pockets.length; i++) {
            if (this._pockets[i].isBallInPocket((_b))) {
                return true;
            }
        }
    }

    public areBallsMoving() : boolean {
        for (let i = 0; i < this._balls.length; i++) {
            if (this._balls[i].isMoving()) {
                return true;
            }
        }
        return false;
    }

    public getCurrentPlayer() : Player {
        return this._currentPlayer;
    }

    public getCurrentPlayerBallType() : ballType {
        return this._currentPlayer.getBallType();
    }

    public switchTurns() {
        if (this._currentPlayer === this._players[0]) {
            this._currentPlayer = this._players[1];
        } else {
            this._currentPlayer = this._players[0];
        }
    }

    public checkForCollisions(_b: Ball) : void {
        // check for collisions with other balls
        for (let i = 0; i < this._balls.length; i++) {
            if (_b.equals(this._balls[i])) continue;
            if (_b.location.distance(this._balls[i].location) <= 2 * Ball.getRadius()) {
                // collision
                if (this._balls[i].equals(_b._protectedBall)) continue;
                console.log("collision");
                

                // calculate the angle between the two balls
                let angle = _b.location.angle(this._balls[i].location);

                let calcVelo: Vector = _b._velocity.clone();
                let prevVelo: Vector = _b._velocity.clone();

                // set location of _b so the balls do not get stuck

                // rotate prevVelo 90 degrees in the direction of the collision
                prevVelo.rotate(angle + Math.PI / 2);
                //prevVelo.scalarMultiply(0.75);

                calcVelo.rotate(angle);

                _b.setVelocity(prevVelo); // stop shot
                this._balls[i].setVelocity(calcVelo);
                _b._protectedBall = this._balls[i];
            }
        }

        // check for collisions with rails
        for (let i = 0; i < this._rails.length; i++) {
            if (this._rails[i].isBallInside(_b)) {
                // collision
                console.log("collision with rail");
                _b.setVelocity(Physics.getExitVelo(_b, this._rails[i]));
                _b._protectedBall = null;
            }
        }
    }


    setVisible(_visible: boolean): void {
        this.visible = _visible;
        EventLoop.setListener(this._event, _visible);
    }

    show(): void {
        Canvas.drawImage(this.image, 0, 0, 1600, 900);
    }
    init(): void {
        this.image = getImage("./assets/pool_table.jpg");
        this.visible = true;
        this.show();
        this._event = EventLoop.addListener({id: "table", function: this.update, active: true, self: this});
    }
    update(self: any): void {
        Canvas.clear();
        Canvas.drawImage((<Table>self).image, 0, 0, 1600, 900);
    }


}