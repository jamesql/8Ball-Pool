import Table from "./Table";
import { _graphics } from './util/Types';
import { Menu } from './Menu';

export class Game {

    _table: Table;
    _menu: Menu;

    constructor() {
        this._menu = new Menu();
    }


};

new Game();