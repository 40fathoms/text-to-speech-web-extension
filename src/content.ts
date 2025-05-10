import TextToSpeech from './classes/text-to-speech';
import { handleMessageListener } from './utils/message-events';
import { getFocusedElementText, getSelectedText } from './utils/text-selection';

// toggle - read on focus and selection

// trigger type - only selections should add outline

const textToSpeech = new TextToSpeech({
  volume: 0.8
  // lang: 'pt-BR'
});

// document.addEventListener('click', async () => {
//   const selectedText = await getSelectedText();

//   if (selectedText) {
//     console.log('selectedText: ', selectedText);
//     textToSpeech.speak(selectedText);
//   }
// });

document.addEventListener('focusin', async () => {
  const focusedElement = await getFocusedElementText();

  if (focusedElement) {
    textToSpeech.speak(focusedElement);
  }
});

document.addEventListener('keydown', async (event) => {
  if (event.altKey && event.key === 'a') {
    const selectedText = await getSelectedText();

    if (selectedText) {
      textToSpeech.speak(selectedText);
    }
  }

  if (event.altKey && event.key === 'r') {
    textToSpeech.resume();
  }

  if (event.altKey && event.key === 'p') {
    textToSpeech.pause();
  }

  if (event.altKey && event.key === 's') {
    textToSpeech.stop();
  }
});

// listener for messages from the popup
handleMessageListener(async (message, _sender, sendResponse) => {
  if (message.type === 'PLAY') {
    const selectedText = await getSelectedText();

    if (textToSpeech.isPaused) {
      textToSpeech.resume();
      return;
    }

    if (selectedText) {
      textToSpeech.speak(selectedText);
      return;
    }
  }

  if (message.type === 'PAUSE') {
    textToSpeech.pause();
  }

  if (message.type === 'STOP') {
    textToSpeech.stop();
  }

  if (message.type === 'GET_TEXT_TO_SPEECH_INSTANCE') {
    const selectedText = await getSelectedText();
    sendResponse({ selectedText, textToSpeech });
  }
});

console.log('Content script loaded');
