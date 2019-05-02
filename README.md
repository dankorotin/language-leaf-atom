# Leaf 3 language support for Atom

Syntax highlighting and autocompletion for [Leaf 3](https://github.com/vapor/leaf).

## Installation

Just get [Atom](https://www.atom.io), and then:
- either navigate to `Preferences > Install` and search for `leaf`. The package is called `language-leaf-atom`, should be the first one in the results...
- ...or get it [here](https://atom.io/packages/language-leaf-atom).

## Features

### 💡 Syntax highlighting

In `.leaf` files will highlight Leaf tags, HTML and JS. Works as intended (mostly, still need to handle some edge cases).

### 💻 Code completion

In `.leaf` files will offer autocompletion for built-in Leaf tags (v.3 supported currently, will add Leaf Kit support after it becomes stable).

Autocompletion should work for both `#tag` and `tag` variants (i.e., you don't need to type the `#` character first). You can tab through the parameters afterwards. Snippets with body (i.e., space between the `{` and `}` chracters) support tabbing inside it to further speed up the development! 🥳

## Planned

The package is still in development: see the [project](https://github.com/daniilkorotin/language-leaf-atom/projects/1) for current progress. [Leaf Kit](https://github.com/vapor/leaf-kit) support coming after syntax is established.

## Issues

If you encounter any problems with the package, please [make an issue](https://github.com/issues) or fork the repo and make a pull request. 🙏!
