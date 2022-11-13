import Table from "./Table";
import { _graphics } from './util/Types';
import { Menu } from './Menu';
import {Input} from "./util/Input";

export class Game {

    _table: Table;
    _menu: Menu;

    constructor() {
        Input.init();
        this._menu = new Menu();
    }


};

new Game();