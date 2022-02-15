import { metadata } from '@utils/metadata';
import { MvcController } from 'mvc-middleware';

import { users } from '../data/users';

@metadata
class RestController extends MvcController {
  static area = '/api/user';
  static get = {
    '': nameof<RestController>(o => o.getUsersAsync),
  };

  async getUsersAsync() {
    return this.ok(users);
  }
}

export default RestController;
