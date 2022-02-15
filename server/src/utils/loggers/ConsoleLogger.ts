import { Logger } from './Logger';

class ConsoleLogger extends Logger {
  log(message, eventKind) {
    console.log(`\n${new Date().toISOString()}`);
    switch (eventKind) {
      case 'debug':
        console.log('DEBUG');
        break;

      case 'info':
        console.log('\x1b[34m%s\x1b[0m', 'INFO');
        break;

      case 'warning':
        console.log('\x1b[33m%s\x1b[0m', 'WARNING');
        break;

      case 'error':
        console.log('\x1b[31m%s\x1b[0m', 'ERROR');
        break;

      default:
        throw new Error(`Invalid eventKind: ${eventKind}`);
    }
    console.log(message);
  }

  debug(message) {
    this.log(message, 'debug');
  }

  info(message) {
    this.log(message, 'info');
  }

  warning(message) {
    this.log(message, 'warning');
  }

  error(message) {
    this.log(message, 'error');
  }
}

export { ConsoleLogger };
