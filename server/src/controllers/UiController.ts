import { metadata } from '@utils/metadata';
import { MvcController } from 'mvc-middleware';
import path from 'path';

const urls = [
  '/',
];

@metadata
class UiController extends MvcController {
  static get = urls.reduce((urls, url) => {
    urls[url] = nameof<UiController>((o) => o.index);
    return urls;
  }, {} as { [url: string]: string });

  getViewPath(viewName: string) {
    const appDir = path.dirname(require.main?.filename || __dirname);
    const htmlPath = path.join(appDir, '..', '..', 'dist');
    return path.join(htmlPath, `${viewName}.html`);
  }

  async index() {
    return this.view('index');
  }
}

export default UiController;
