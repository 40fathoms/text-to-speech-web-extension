import TextToSpeech from './classes/text-to-speech';
import { handleFormSubmission } from './utils/handle-form-submission';
import {
  handleGetLocalStorage,
  handleSetLocalStorage
} from './utils/local-storage';
import {
  handleMessageListener,
  handleSendRuntimeMessage
} from './utils/message-events';
import { getFocusedElementText, getSelectedText } from './utils/text-selection';

handleGetLocalStorage().then((userSpecs) => {
  if (userSpecs) {
    const textToSpeech = new TextToSpeech({
      lang: userSpecs.lang,
      volume: userSpecs.volume,
      rate: userSpecs.rate,
      pitch: userSpecs.pitch
    });

    document.addEventListener('keydown', async (event) => {
      if (
        event.key === 'Tab' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      ) {
        setTimeout(async () => {
          const focusedElement = await getFocusedElementText();

          if (focusedElement) {
            textToSpeech.speak(focusedElement);
          }
        }, 10);

        return;
      }

      if (event.altKey && event.key === 'a') {
        const selectedText = await getSelectedText();

        if (selectedText) {
          textToSpeech.speak(selectedText);
        }

        return;
      }

      if (event.altKey && event.key === 'r') {
        textToSpeech.resume();
        return;
      }

      if (event.altKey && event.key === 'p') {
        textToSpeech.pause();
        return;
      }

      if (event.altKey && event.key === 's') {
        textToSpeech.stop();
        return;
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

        return;
      }

      if (message.type === 'PAUSE') {
        textToSpeech.pause();
        return;
      }

      if (message.type === 'STOP') {
        textToSpeech.stop();
        return;
      }

      if (message.type === 'GET_TEXT_TO_SPEECH_INSTANCE') {
        const selectedText = await getSelectedText();
        sendResponse({ selectedText, textToSpeech });
        return;
      }

      if (message.type === 'SUBMIT_SETTINGS_FORM') {
        handleFormSubmission({ textToSpeech, message }).then(
          async (updatedUserSpecs) => {
            await handleSetLocalStorage(JSON.stringify(updatedUserSpecs));

            handleSendRuntimeMessage({
              type: 'CLOSE_POPUP'
            });
          }
        );

        return;
      }
    });

    console.log('Content script loaded');
  }
});
