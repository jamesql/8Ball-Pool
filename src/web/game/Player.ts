import { ballType } from "./util/Types";

// this is never used
export class Player {

    private ballType: ballType;

    constructor() {
        console.log("Player created");
    }

    public setBallType(ballType: ballType) {
        this.ballType = ballType;
    }

    public getBallType(): ballType {
        return this.ballType;
    }
}