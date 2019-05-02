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
			return this.findMatchingSuggestions('#' + prefix);
		}
	}

	getPrefix(editor, bufferPosition) {
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		let match = line.match(/\S+$/);
		return match ? match[0] : '';
	}

	// getSuggestions(options) {
	// 	const { editor, bufferPosition, scopeDescriptor, prefix } = options;
	//
	// 	if (prefix.length >= 1) {
	// 		return this.findMatchingSuggestions(prefix);
	// 	}
	// }

	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.displayText.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		return matchingSuggestions.map(this.inflateSuggestion);
	}

	inflateSuggestion(suggestion) {
		return {
			snippet: suggestion.snippet,
			description: suggestion.description,
		};
	}
}

export default new LeafProvider();
