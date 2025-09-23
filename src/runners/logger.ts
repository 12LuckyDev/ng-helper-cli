import pc from 'picocolors';

export class Logger {
  private _verbose: boolean;
  constructor({ verbose }: { verbose?: boolean } = {}) {
    this._verbose = !!verbose;
  }

  public verbose(text: string): void {
    if (this._verbose) {
      console.info(pc.cyan(text));
    }
  }

  public output(text: string): void {
    if (this._verbose) {
      console.info(pc.blue(text));
    }
  }

  public success(text: string): void {
    console.info(pc.greenBright(text));
  }

  public error(ex: string | unknown): void {
    console.error(pc.red(typeof ex === 'string' ? ex : JSON.stringify(ex)));
  }
}
