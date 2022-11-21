import { ballType } from "./util/Types";

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