import { _graphics } from './util/Types';
export default class Table {
    
    constructor(g: _graphics) {
        // create a black rectangle with size 500x500 on the canvas
        g.context.fillStyle = "black";
        g.context.fillRect(0, 0, 500, 500);
    }
}