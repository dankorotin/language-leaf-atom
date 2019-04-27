'use babel';

import LanguageLeafAtomView from './language-leaf-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  languageLeafAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageLeafAtomView = new LanguageLeafAtomView(state.languageLeafAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageLeafAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-leaf-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageLeafAtomView.destroy();
  },

  serialize() {
    return {
      languageLeafAtomViewState: this.languageLeafAtomView.serialize()
    };
  },

  toggle() {
    console.log('LanguageLeafAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
