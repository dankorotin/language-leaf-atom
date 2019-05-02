'use babel';

import {
  CompositeDisposable
} from 'atom';

import leafProvider from './leaf-provider';

export default {
  activate(state) {
    atom.grammars.addInjectionPoint('text.html.leaf', {
      type: 'raw_text',
      language (node) { return 'html' },
      content (node) { return node }
    })

    atom.grammars.addInjectionPoint('text.html.leaf', {
      type: 'html',
      language (node) { return 'html' },
      content (node) { return node }
    })
  },

  getProvider() {
    return [leafProvider];
  }
};
