export default class CommentObservable {
    private _reloadComment: boolean = false;
    private listeners: Function[] = [];

    private static _instance: CommentObservable | null = null;

    private constructor() {}

    /**
     * Design pattern singleton
     * @returns SecurityService
     */
    public static getInstance(): CommentObservable {
      if (this._instance === null) {
        this._instance = new CommentObservable();
      }
      return this._instance;
    }

    /**
     * Design pattern observer pour répercuter _reloadComment
     */
    public notifyListeners() {
      this.listeners.forEach((listener) => {
        listener(this._reloadComment);
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

    set reloadComment(value: boolean) {
        this._reloadComment = value;
    }

    get reloadComment(): boolean {
        return this._reloadComment;
    }

  }
