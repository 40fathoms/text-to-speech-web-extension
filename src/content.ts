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
      }

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

      if (event.altKey && event.key === 't') {
        console.log('textToSpeech: ', textToSpeech);
      }

      if (event.altKey && event.key === 'y') {
        textToSpeech.configure({
          lang: 'pt-BR'
        });
      }

      if (event.altKey && event.key === 'h') {
        textToSpeech.configure({
          lang: 'en-US'
        });
      }

      if (event.altKey && event.key === 'u') {
        textToSpeech.configure({
          volume: 0.5
        });
      }

      if (event.altKey && event.key === 'j') {
        textToSpeech.configure({
          volume: 1
        });
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

      if (message.type === 'SUBMIT_SETTINGS_FORM') {
        handleFormSubmission({ textToSpeech, message }).then(
          async (updatedUserSpecs) => {
            await handleSetLocalStorage(JSON.stringify(updatedUserSpecs));

            handleSendRuntimeMessage({
              type: 'CLOSE_POPUP'
            });
          }
        );
      }
    });

    console.log('Content script loaded');
  }
});
