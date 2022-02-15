class Logger {
  constructor() {
    if (new.target === Logger) {
      throw new TypeError('Cannot construct Logger instances directly');
    }
  }

  log(message: string, eventKind: 'debug' | 'info' | 'warning' | 'error'): void {
    throw new Error('Not implemented');
  }

  debug(message: string): void {
    throw new Error('Not implemented');
  }

  info(message: string): void {
    throw new Error('Not implemented');
  }

  warning(message: string): void {
    throw new Error('Not implemented');
  }

  error(message: string): void {
    throw new Error('Not implemented');
  }
}

export { Logger };
