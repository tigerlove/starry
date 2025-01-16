import * as vscode from "vscode";
import { getUri } from "../utils/getUri";
import { getNonce } from "../utils/getNonce";

export class SettingsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "starry-code.settingsView";
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._extensionUri
      ],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Handle webview errors
    webviewView.webview.onDidReceiveMessage(message => {
      if (message.type === 'error') {
        vscode.window.showErrorMessage(`Webview Error: ${message.message}`);
      }
    });
  }

  public getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview
    const stylesUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "style.css"]);
    const settingsScriptUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "settings.js"]);

    const nonce = getNonce();

    return /*html*/`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
         
          <title>Starry Settings</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${settingsScriptUri}"></script>
          <script nonce="${nonce}">
            window.addEventListener('error', function(event) {
              const vscode = acquireVsCodeApi();
              vscode.postMessage({
                type: 'error',
                message: event.message
              });
            });
          </script>
        </body>
      </html>
    `;
  }
} 