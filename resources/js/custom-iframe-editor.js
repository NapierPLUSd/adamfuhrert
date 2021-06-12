(function () {
  const vscode = acquireVsCodeApi();
  // 消息转发中间层
  addEventListener('message', event => {
    if (event.data) {
      const message = event.data;
      switch (message.target) {
        // 收到 vscode 消息，转发给 iframe
        case 'vscode':
          return iframe.contentWindow.postMessage(message, '*');
        // 收到 iframe 消息，转发给 vscode
        case 'iframe':
          return vscode.postMessage(message);
      }
    }
  });
})();
