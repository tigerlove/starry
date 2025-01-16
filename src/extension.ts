import * as vscode from 'vscode';
import { RulesViewProvider } from './panels/RulesViewProvider';
import { SettingsViewProvider } from './panels/SettingsViewProvider';
import { ChatViewProvider } from "./panels/ChatViewProvider";

/**
 * 扩展激活时调用的入口函数
 * @param context 扩展上下文，用于注册命令和管理资源
 */
export function activate(context: vscode.ExtensionContext) {
  // Register Rules View Provider
  const rulesProvider = RulesViewProvider.getInstance(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      RulesViewProvider.viewType,
      rulesProvider
    )
  );

  // Register Rules Viewer Command
  let rulesCommand = vscode.commands.registerCommand(
    "starry-code.openViewer",
    () => {
      rulesProvider.show();
    }
  );
  context.subscriptions.push(rulesCommand);

  // Register Settings View Provider
  const settingsProvider = new SettingsViewProvider(context.extensionUri);
  
  // Register Settings Command
  let settingsCommand = vscode.commands.registerCommand(
    "starry-code.openSettings",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "starrySettings",
        "Starry Settings",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [context.extensionUri],
        }
      );
      
      panel.webview.html = settingsProvider.getHtmlForWebview(panel.webview);
    }
  );

  context.subscriptions.push(settingsCommand);

  // Register Chat Provider and Command
  const chatProvider = ChatViewProvider.getInstance(context.extensionUri);
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ChatViewProvider.viewType,
      chatProvider
    )
  );

  // Register Focus Chat Command
  context.subscriptions.push(
    vscode.commands.registerCommand("starry-code.focusChat", async () => {
      await vscode.commands.executeCommand('starry-code.chatView.focus');
    })
  );
}

/**
 * 扩展停用时调用的清理函数
 */
export function deactivate() {}
