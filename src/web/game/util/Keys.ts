import { _key } from './Types';
export class Keys {
    private static keyMap: _key[] = [];

    constructor() {
        Keys.keyMap = [];
    }

    public static addKey(key: _key) {
        Keys.keyMap.push(key);
    }

    public static getKey(keyString: string): _key {
        return Keys.keyMap.find(k => k.key === keyString);
    }

    public static removeKey(keyString: string) {
        Keys.keyMap.splice(Keys.keyMap.indexOf(Keys.getKey(keyString)), 1);
    }

    public static clear() {
        Keys.keyMap = [];
    }

    public static getKeys(): _key[] {
        return Keys.keyMap;
    }

    public static getActiveKeys(): _key[] {
        return Keys.keyMap.filter(k => k.active);
    }

    public static getActiveKey(keyString: string): _key {
        return Keys.getActiveKeys().find(k => k.key === keyString);
    }

    public static async keyboardClick(keyString: string) {
        let _k = Keys.getActiveKey(keyString);
        if (_k) await _k.onDown(_k.obj);
    }
}