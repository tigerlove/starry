import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";

export class ChatViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "starry-code.chatView";
  private _view?: vscode.WebviewView;

  private static instance: ChatViewProvider;

  private constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {}

  public static getInstance(extensionUri: vscode.Uri): ChatViewProvider {
    if (!ChatViewProvider.instance) {
      ChatViewProvider.instance = new ChatViewProvider(extensionUri);
    }
    return ChatViewProvider.instance;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.type) {
        case 'error':
          vscode.window.showErrorMessage(message.value);
          break;
      }
    });
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

  private handleMessage(message: any) {
    switch (message.type) {
      case 'chat':
        // 处理从 webview 发来的聊天消息
        console.log('Received chat message:', message.message)
        // 在这里添加你的聊天消息处理逻辑
        break
      // ... 其他消息类型的处理
    }
  }
}
