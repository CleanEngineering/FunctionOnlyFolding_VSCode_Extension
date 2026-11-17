const vscode = require("vscode");
const { getFunctionStartLines } = require("./src/functionRanges");

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const command = vscode.commands.registerTextEditorCommand(
        "functionOnlyFolding.collapseToDefinitions",
        async (editor) => {
            const languageId = editor.document.languageId;

            if (languageId !== "typescript" && languageId !== "typescriptreact") {
                return;
            }

            const startLines = getFunctionStartLines(
                editor.document.getText(),
                editor.document.fileName,
                languageId
            );

            if (startLines.length === 0) {
                return;
            }

            await vscode.commands.executeCommand("editor.fold", {
                selectionLines: startLines
            });
        }
    );

    context.subscriptions.push(command);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
