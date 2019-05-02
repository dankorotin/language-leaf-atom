'use babel';

// data source is a simple array of strings
import suggestions from '../data/leaf';

class LeafProvider {
	constructor() {
		this.selector = '.text.html.leaf';
		// this.disableForSelector = '.text.html.leaf .comment';
		this.suggestionPriority = 2;
		// this.filterSuggestions = true;
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;
		let prefix = this.getPrefix(editor, bufferPosition);

		if ((prefix.startsWith('#') && prefix.length > 1)) {
			return this.findMatchingSuggestions(prefix);
		} else if (prefix.length > 0) {
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
		let p = prefixLower.startsWith('#') ? prefixLower : '#' + prefixLower
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.displayText.toLowerCase();
			return textLower.startsWith(p);
		});

		let inflateSuggestion = this.inflateSuggestion.bind(this, prefixLower);
		return matchingSuggestions.map(inflateSuggestion);
	}

	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			displayText: suggestion.displayText,
			snippet: suggestion.snippet,
			description: suggestion.description,
			replacementPrefix: replacementPrefix,
			iconHTML: '<i class="icon-comment"></i>',
			type: 'snippet',
			rightLabelHTML: '<span class="aab-right-label">Snippet</span>'
		};
	}
}

export default new LeafProvider();
