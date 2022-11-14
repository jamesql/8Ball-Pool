import { Ball } from './Ball';
import { Canvas } from './Graphics';
import { getImage } from './util/UtilFunctions';
import { Pocket } from './Pocket';

export default class Table {
    _balls: Ball[] = [];
    _pockets: Pocket[] = [];

    constructor() {
        Canvas.drawImage(getImage("./assets/pool_table.jpg"), 0, 0, 1600, 900);
        console.log("Table created");
    }


}