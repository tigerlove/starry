import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";

export class ChatViewProvider {
  public static readonly viewType = "starry-code.chatView";
  private static _instance: ChatViewProvider;
  private _panel?: vscode.WebviewPanel;

  private constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {}

  public static getInstance(extensionUri: vscode.Uri): ChatViewProvider {
    if (!ChatViewProvider._instance) {
      ChatViewProvider._instance = new ChatViewProvider(extensionUri);
    }
    return ChatViewProvider._instance;
  }

  public async show() {
    const rightColumn = await this.ensureRightColumn();
    
    if (this._panel) {
      // If panel exists, move it to the right column if needed
      if (this._panel.viewColumn !== rightColumn) {
        this._panel.reveal(rightColumn);
      } else {
        this._panel.reveal(this._panel.viewColumn);
      }
    } else {
      // Create new panel in the right column
      this._panel = vscode.window.createWebviewPanel(
        ChatViewProvider.viewType,
        "Starry Chat",
        rightColumn,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [this._extensionUri],
        }
      );

      this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);

      // Handle panel disposal
      this._panel.onDidDispose(
        () => {
          this._panel = undefined;
        },
        null
      );

      // Handle panel movement
      this._panel.onDidChangeViewState(e => {
        const currentRightColumn = this.getCurrentRightColumn();
        if (e.webviewPanel.visible && e.webviewPanel.viewColumn !== currentRightColumn) {
          // If panel is moved to a different column, move it back to the right
          e.webviewPanel.reveal(currentRightColumn);
        }
      });
    }
  }

  private async ensureRightColumn(): Promise<vscode.ViewColumn> {
    const activeEditor = vscode.window.activeTextEditor;
    
    if (!activeEditor) {
      // If no editor is open, create a new untitled document in the first column
      const document = await vscode.workspace.openTextDocument({ content: '' });
      await vscode.window.showTextDocument(document, vscode.ViewColumn.One);
      return vscode.ViewColumn.Two;
    }

    // Get the current active column
    const currentColumn = activeEditor.viewColumn || vscode.ViewColumn.One;
    
    if (currentColumn === vscode.ViewColumn.One) {
      // If we're in the first column, move the editor to the left
      await vscode.window.showTextDocument(activeEditor.document, vscode.ViewColumn.One);
      return vscode.ViewColumn.Two;
    }

    return currentColumn + 1 as vscode.ViewColumn;
  }

  private getCurrentRightColumn(): vscode.ViewColumn {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      return vscode.ViewColumn.Two;
    }
    const currentColumn = activeEditor.viewColumn || vscode.ViewColumn.One;
    return currentColumn === vscode.ViewColumn.One ? 
      vscode.ViewColumn.Two : 
      (currentColumn + 1) as vscode.ViewColumn;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "style.css"]);
    const scriptUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.js"]);
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${styleResetUri}">
          <title>Starry Chat</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
  }
}
