# Function Folding (Ctrl+M+O)

> Fold TypeScript function and method bodies with the familiar Visual Studio `Ctrl+M, Ctrl+O` shortcut.

## Overview

**Function Folding** is a Visual Studio Code extension for folding function and method bodies in TypeScript and TypeScript React files.

It identifies function-like syntax using the TypeScript compiler API and folds the corresponding regions without targeting surrounding classes, interfaces, or control-flow blocks.

### Highlights

- Provides the `Ctrl+M`, then `Ctrl+O` keyboard shortcut.
- Supports TypeScript (`.ts`) and TypeScript React (`.tsx`).
- Supports function declarations, function expressions, and arrow functions.
- Supports class methods, constructors, getters, and setters.
- Leaves classes, interfaces, and control-flow blocks out of the fold targets.
- Uses syntax-tree analysis rather than regular expressions.
- Provides a Command Palette command as an alternative to the keyboard shortcut.

## Folding behavior

The extension targets multiline, block-bodied function-like declarations and expressions. It does not target function signatures without implementations or single-line function bodies.

Classes, interfaces, namespaces, and control-flow statements such as `if`, `for`, `while`, `switch`, and `try/catch` are not selected as independent fold targets.

## Installation

### From the Marketplace

1. Open the Extensions view in VS Code.
2. Search for **Function Folding (Ctrl+M+O)**.
3. Select the extension published by **CleanDevelopment** and choose **Install**.

### From a VSIX

For local installation:

```powershell
code --install-extension function-only-folding-1.0.0.vsix
```

## Usage

1. Open a TypeScript (`.ts`) or TypeScript React (`.tsx`) file.
2. Focus the editor.
3. Press `Ctrl+M`, release the keys, and then press `Ctrl+O`.

Alternatively, open the Command Palette with `Ctrl+Shift+P` and run **Function Folding: Fold All Functions (Ctrl+M+O)**.

## Keyboard shortcut

| Platform | Shortcut | Description |
|---|---|---|
| Windows / Linux | `Ctrl+M`, then `Ctrl+O` | Fold function and method bodies in the active TypeScript editor. |

The shortcut is active when a TypeScript or TypeScript React editor has focus. In other editor contexts, the default `Ctrl+M` behavior is preserved.

## Commands

| Command | Description |
|---|---|
| `Function Folding: Fold All Functions (Ctrl+M+O)` | Fold detected function and method bodies in the active TypeScript editor. |

## Requirements

- Visual Studio Code `1.90.0` or later.
- A TypeScript or TypeScript React editor.
- Node.js and npm are required only for development and packaging.

## Privacy

The extension reads the active TypeScript or TSX document locally to identify function-like syntax. It does not send source code or file contents to a remote service.

## Support

Report bugs and request features through the project's GitHub repository:

https://github.com/CleanEngineering/FunctionOnlyFolding_VSCode_Extension/issues

## Development

The extension uses the VS Code Extension API and the TypeScript compiler API to identify function-like syntax and invoke VS Code's native folding command.

To install dependencies, run tests, and package the extension:

```powershell
npm ci
npm test
npm run package
```

## License

MIT. See [LICENSE](LICENSE).

## Publisher

Created and maintained by **CleanEngineering**.

Repository: https://github.com/CleanEngineering/FunctionOnlyFolding_VSCode_Extension

## Support

If this extension is useful to you, consider supporting its development:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/cleanengineering)
- ❤️ [GitHub Sponsors](https://github.com/sponsors/CleanEngineering)

Your support helps me continue building and maintaining free, open-source tools for developers.
