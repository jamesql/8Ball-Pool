import Table from "./Table";
import { _graphics } from './util/Types';
import { Menu } from './Menu';
import {Input} from "./util/Input";
import "./client";

export class Game {

    static _table: Table;
    static _menu: Menu;
    static _instance: Game;

    constructor() {
        if (Game._instance) {
            return Game._instance;
        } else {
            Game._instance = this;
        }

        Input.init();
        Game._menu = new Menu();
    }

    public static init(): void {
        Game._table = new Table();
    }


};

new Game();