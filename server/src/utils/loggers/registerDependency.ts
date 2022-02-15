import { Container } from 'cheap-di';
import { Logger } from './Logger';
import { ConsoleLogger } from './ConsoleLogger';

function registerDependency(container: Container) {
  container.registerType(ConsoleLogger).as(Logger);
}

export { registerDependency };
