import Table from "./Table";
import { _graphics } from './util/Types';
import { Menu } from './Menu';
import {Input} from "./util/Input";
import "./client";
import EventLoop from "./util/EventLoop";
import { Buttons } from './util/Buttons';
import { Keys } from './util/Keys';

export class Game {

    static _table: Table;
    static _menu: Menu;

    constructor() {
        Input.init();
        Game._menu = new Menu();
    }

    public static init(): void {
        new EventLoop();
        Game._table = new Table();
    }

    public static refresh(): void {
        EventLoop.clear();
        Buttons.clear();
        Keys.clear();
        Game.init();


        
    }

    public static getTable(): Table {
        return Game._table;
    }
    
};

new Game();