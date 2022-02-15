import { Container } from 'cheap-di';

import { registerDependency as registerLogger } from '@utils/loggers';

function configDependencies(container: Container) {
  registerLogger(container);
}

export { configDependencies };
