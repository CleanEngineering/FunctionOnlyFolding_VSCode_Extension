const ts = require("typescript");

const FUNCTION_LIKE_KINDS = new Set([
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.MethodDeclaration,
    ts.SyntaxKind.Constructor,
    ts.SyntaxKind.GetAccessor,
    ts.SyntaxKind.SetAccessor
]);

/**
 * Finds the starting line of every multiline, block-bodied function-like node.
 *
 * Line numbers are zero-based because VS Code's editor.fold command expects
 * zero-based line indexes in its selectionLines argument.
 *
 * @param {string} text
 * @param {string} fileName
 * @param {"typescript" | "typescriptreact"} languageId
 * @returns {number[]}
 */
function getFunctionStartLines(text, fileName, languageId) {
    const scriptKind = languageId === "typescriptreact"
        ? ts.ScriptKind.TSX
        : ts.ScriptKind.TS;

    const sourceFile = ts.createSourceFile(
        fileName || (scriptKind === ts.ScriptKind.TSX ? "file.tsx" : "file.ts"),
        text,
        ts.ScriptTarget.Latest,
        true,
        scriptKind
    );

    const lines = new Set();

    function visit(node) {
        if (
            FUNCTION_LIKE_KINDS.has(node.kind) &&
            node.body &&
            ts.isBlock(node.body)
        ) {
            const declarationStartLine =
                sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line;
            const bodyEndLine =
                sourceFile.getLineAndCharacterOfPosition(node.body.getEnd()).line;

            // VS Code folding is line-based; single-line bodies cannot be folded.
            if (bodyEndLine > declarationStartLine) {
                lines.add(declarationStartLine);
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    return [...lines].sort((left, right) => left - right);
}

module.exports = { getFunctionStartLines };
