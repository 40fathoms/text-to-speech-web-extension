type MessageInput = { type: string } & { [x: string]: string };

const handleMessageListener = (
  callback: (
    message: MessageInput,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void
  ) => Promise<void> | void
) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    callback(message, sender, sendResponse);
  });
};

const handleSendRuntimeMessage = async (message: MessageInput) => {
  try {
    await chrome.runtime.sendMessage(message);
  } catch (e) {
    console.error('Error sending runtime message:', e);
  }
};

const handleSendTabsMessage = (
  message: MessageInput,
  callback: (response: unknown) => void = () => null
) => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tabId = tabs[0].id!;

      chrome.tabs.sendMessage(tabId, message, callback);
    });
  } catch (e) {
    console.error('Error sending tabs message:', e);
  }
};

export {
  handleMessageListener,
  handleSendRuntimeMessage,
  handleSendTabsMessage
};
