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
		const { prefix } = options;

		if (prefix.length >= 1) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.snippet.toLowerCase();
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
