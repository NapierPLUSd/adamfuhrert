import { ExtensionContext } from 'vscode';

import { IBizModelUIEditorProvider } from './ibiz-model-ui/ibiz-model-ui';
import { IBizModelRuntimeEditorProvider } from './ibiz-model-runtime/ibiz-model-runtime';

export function installCustomEditor(context: ExtensionContext) {
  // 注册自定义编辑器
  context.subscriptions.push(IBizModelUIEditorProvider.register(context));
  context.subscriptions.push(IBizModelRuntimeEditorProvider.register(context));
}
