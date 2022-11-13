import Table from "./Table";
import { _graphics } from './util/Types';
import { Menu } from './Menu';
import {Input} from "./util/Input";

export class Game {

    static _table: Table;
    static _menu: Menu;
    static _self: Game;

    constructor() {

        if (Game._self) {
            return Game._self;
        } else {
            Game._self = this;
        }

        Input.init();
        Game._menu = new Menu();
    }

    public static init(): void {
        Game._table = new Table();
    }


};

new Game();