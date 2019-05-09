'use babel';

import suggestions from '../data/leaf-3-tags';

class LeafProvider {
	constructor() {
		this.selector = '.text.html.leaf';
		this.suggestionPriority = 2;
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;
		let prefix = this.getPrefix(editor, bufferPosition);

		if ((prefix.startsWith('#') && prefix.length > 1) ||
				(!prefix.startsWith('#') && prefix.length > 0)) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	getPrefix(editor, bufferPosition) {
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		let match = line.match(/\S+$/);
		return match ? match[0] : '';
	}

	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase();
		let p = prefixLower.startsWith('#') ? prefixLower.slice(1) : prefixLower
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.displayText.toLowerCase();
			return textLower.startsWith(p);
		});

		let inflateSuggestion = this.inflateSuggestion.bind(this, prefixLower);
		return matchingSuggestions.map(inflateSuggestion);
	}

	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			// TODO: Don't add the # symbol for tags inside another Leaf tag parameters.
			displayText: '#' + suggestion.displayText,
			snippet: '#' + suggestion.snippet,
			description: suggestion.description,
			replacementPrefix: replacementPrefix,
			iconHTML: '<i class="icon-comment"></i>',
			type: 'snippet',
			rightLabelHTML: '<span class="aab-right-label">Leaf 3</span>'
		};
	}
}

export default new LeafProvider();
