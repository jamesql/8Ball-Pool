export default class EventLoop {
    private static _listeners: Array<Function> = [];

    public static addListener(listener: Function): void {
        this._listeners.push(listener);
    }

    public static removeListener(listener: Function): void {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
    }

    public static run(): void{
        this._listeners.forEach(listener => listener());
    }

    public static clear(): void {
        this._listeners = [];
    }

    public static listeners(): Array<Function> {
        return this._listeners;
    }
}