# Function Only Folding

A Visual Studio Code extension that provides a TypeScript-focused equivalent of Visual Studio's **Collapse to Definitions** command.

It folds function bodies while leaving surrounding classes, interfaces, namespaces, and control-flow blocks (`if`, `for`, `while`, `switch`, `try/catch`, etc.) alone.

## Supported syntax

- Function declarations
- Function expressions
- Arrow functions, including async arrow functions
- Class methods
- Constructors
- Getters and setters
- TSX function components

Only block-bodied functions spanning more than one line are folded. Function signatures without implementations and single-line bodies are skipped.

## Keyboard shortcut

On Windows and Linux:

`Ctrl+M`, then `Ctrl+O`

The shortcut is active in TypeScript (`.ts`) and TypeScript React (`.tsx`) editors.

You can also run:

**Function Only Folding: Collapse to Definitions**

from the Command Palette.

## Install from source

Requirements:

- Visual Studio Code
- Node.js and npm
- Visual Studio Code Extension Manager (`@vscode/vsce`), installed locally by this project

In the extension directory, run:

```powershell
npm install
npm test
npm run package
```

This creates a `.vsix` package in the project directory. Install it with:

```powershell
code --install-extension .\function-only-folding-1.0.0.vsix
```

## Publish to the Visual Studio Code Marketplace

1. Change `publisher` in `package.json` from `your-publisher-id` to your Marketplace publisher ID.
2. Ensure the extension name, description, repository and author metadata are set as desired.
3. Create a Personal Access Token with Marketplace publishing permissions.
4. Sign in and publish:

```powershell
npx @vscode/vsce login your-publisher-id
npm run publish
```

The Marketplace publisher account and Personal Access Token must belong to you; they cannot be embedded in this project.

## Behavior notes

The extension uses the TypeScript compiler parser (AST), not regular expressions. It identifies function-like syntax nodes and asks VS Code's native folding engine to fold at those declaration lines. This avoids treating ordinary control-flow blocks as target fold regions.

The extension does not register a competing folding-range provider and does not change the editor's normal folding behavior.

## License

MIT. See [LICENSE](LICENSE).


## Extension icon

The package references `icon.png` in the project root. Replace that file with your own **128 × 128 PNG** icon before publishing. Keep the filename and path exactly as `icon.png`.

## Support

If this extension is useful to you, consider supporting its development:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/cleanengineering)
- ❤️ [GitHub Sponsors](https://github.com/sponsors/CleanEngineering)

Your support helps me continue building and maintaining free, open-source tools for developers.
