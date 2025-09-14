import { getRuntimeAPI, getRuntimeTabs } from './get-browser-methods';

type MessageInput = { type: string } & { [x: string]: unknown };

const runtime = getRuntimeAPI();
const browserTabs = getRuntimeTabs();

/**
 * Sets up a listener for incoming messages from `chrome.runtime` or `browser.runtime`.
 *
 * @param callback - A function to handle incoming messages. Receives the message,
 * the sender, and a function to send a response.
 *
 */
const handleMessageListener = (
  callback: (
    message: MessageInput,
    sender: chrome.runtime.MessageSender | browser.runtime.MessageSender,
    sendResponse: (response: unknown) => void
  ) => Promise<void> | void
) => {
  runtime.onMessage.addListener((message, sender, sendResponse) => {
    callback(message, sender, sendResponse);
  });
};

/**
 * Sends a message to the background script or other parts of the extension using `runtime.sendMessage`.
 *
 * @param {MessageInput} message - The message object to send. Must include a `type` and optionally other fields.
 *
 */
const handleSendRuntimeMessage = async (message: MessageInput) => {
  try {
    // @ts-ignore
    await runtime.sendMessage(message);
  } catch {
    return;
  }
};

/**
 * Sends a message to the active tab using `chrome.tabs.sendMessage` or `browser.tabs.sendMessage`.
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
    browserTabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tabId = tabs[0].id!;

      browserTabs.sendMessage(tabId, message, callback);
    });
  } catch {
    return;
  }
};

export type { MessageInput };

export {
  handleMessageListener,
  handleSendRuntimeMessage,
  handleSendTabsMessage
};
