import { _listener } from "./Types";

export default class EventLoop {
    private static _listeners: Array<_listener> = [];
    private static _instance: EventLoop;
    private static _timeout: NodeJS.Timeout;
    private static _running: boolean = true;

    constructor() {
        if (!EventLoop._instance) {
            EventLoop._instance = this;
            EventLoop.startLoop();
        }
    }

    private static startLoop(): void {
        this._timeout = setInterval(() => {
            this.run();
        }, 1000/60);
    }

    public static getInstance(): EventLoop {
        return this._instance;
    }

    public static addListener(listener: _listener): _listener {
        this._listeners.push(listener);
        return listener;
    }

    public static setListener(listener: _listener, active: boolean): void {
        let index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners[index].active = active;
        }
    }

    public static removeListener(listener: _listener): void {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
    }

    public static run(): void {
        if (!this._running) return;
        this._listeners.forEach(listener => listener.function(listener.self));
    }

    public static setRunning(running: boolean): void {
        this._running = running;
    }

    public static clear(): void {
        this._listeners = [];
    }

    public static listeners(): Array<_listener> {
        return this._listeners;
    }
}