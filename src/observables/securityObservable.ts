export default class SecurityObservable {
  private _isLogged: boolean = false;
  private listeners: Function[] = [];

  private static _instance: SecurityObservable | null = null;

  private constructor() {}

  /**
   * Design pattern singleton
   * @returns SecurityService
   */
  public static getInstance(): SecurityObservable {
    if (this._instance === null) {
      this._instance = new SecurityObservable();
    }
    return this._instance;
  }

  /**
   * Design pattern observer pour répercuter isLogged
   */
  public notifyListeners() {
    this.listeners.forEach((listener) => {
      listener(this._isLogged);
    });
  }

  public addListener(listener: Function): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: Function) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  public get isLogged(): boolean {
    return this._isLogged;
  }

  public set isLogged(value: boolean) {
    this._isLogged = value;
  }
}
