import type TextToSpeech from './classes/text-to-speech';
import {
  handleMessageListener,
  handleSendTabsMessage
} from './utils/message-events';

const playButton = document.querySelector<HTMLButtonElement>('#play-button')!;
const pauseButton = document.querySelector<HTMLButtonElement>('#pause-button')!;
const stopButton = document.querySelector<HTMLButtonElement>('#stop-button')!;

const handleTextToSpeechStatus = (status: 'PLAY' | 'PAUSE' | 'STOP') => {
  handleSendTabsMessage({
    type: status
  });
};

playButton.addEventListener('click', () => handleTextToSpeechStatus('PLAY'));
pauseButton.addEventListener('click', () => handleTextToSpeechStatus('PAUSE'));
stopButton.addEventListener('click', () => handleTextToSpeechStatus('STOP'));

// listener for messages from the content.js
handleMessageListener((message, _sender, _sendResponse) => {
  if (message.type === 'PAUSE') {
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = false;
  }

  if (message.type === 'RESUME' || message.type === 'PLAY') {
    playButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
  }

  if (message.type === 'STOP') {
    playButton.disabled = true;
    pauseButton.disabled = true;
    stopButton.disabled = true;
  }
});

// run when the popup is opened
handleSendTabsMessage(
  {
    type: 'GET_TEXT_TO_SPEECH_INSTANCE'
  },
  (res) => {
    const { selectedText, textToSpeech } = res as {
      selectedText: string;
      textToSpeech: TextToSpeech;
    };

    console.log('textToSpeech: ', textToSpeech);
    if (chrome.runtime.lastError) {
      console.error('Error:', chrome.runtime.lastError.message);
    } else {
      if (textToSpeech.isSpeaking) {
        pauseButton.disabled = false;
        stopButton.disabled = false;
      }

      if (textToSpeech.isPaused) {
        playButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = false;
      }

      if (!textToSpeech.isSpeaking && selectedText) {
        playButton.disabled = false;
      }
    }
  }
);
