type MessageInput = { type: string } & { [x: string]: string };

/**
 * Sets up a listener for incoming messages from `chrome.runtime`.
 *
 * @param callback - A function to handle incoming messages. Receives the message,
 * the sender, and a function to send a response.
 *
 */
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

/**
 * Sends a message to the background script or other parts of the extension using `chrome.runtime.sendMessage`.
 *
 * @param {MessageInput} message - The message object to send. Must include a `type` and optionally other fields.
 *
 */
const handleSendRuntimeMessage = async (message: MessageInput) => {
  try {
    await chrome.runtime.sendMessage(message);
  } catch (e) {
    console.error('Error sending runtime message:', e);
  }
};

/**
 * Sends a message to the active tab using `chrome.tabs.sendMessage`.
 *
 * @param {MessageInput} message - The message object to send. Must include a `type` and optionally other fields.
 * @param callback - Optional function to handle the response from the content script.
 *
 */
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

export type { MessageInput };

export {
  handleMessageListener,
  handleSendRuntimeMessage,
  handleSendTabsMessage
};
