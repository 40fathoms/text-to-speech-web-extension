// toggle - read on focus and selection

// trigger type - only selections should add outline

// add utterance to an array on the class instance

const walkFragmentNodes = async (node, textParts = []) => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.tagName === 'IMG') {
      const altText = node.alt?.trim();
      if (altText) textParts.push(altText);
    } else {
      for (const child of node.childNodes) {
        await walkFragmentNodes(child, textParts);
      }
      textParts.push('. ');
    }

    return;
  }

  const text = node.textContent.trim();
  if (text) textParts.push(text);
};

const getSelectedText = async () => {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    console.log('No selection found.');
    return '';
  }

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const textParts = [];

  for (const fragmentChildNode of fragment.childNodes) {
    await walkFragmentNodes(fragmentChildNode, textParts);
  }

  const finalText = textParts.join('').replace(/\s+/g, ' ').trim();

  return finalText;
};

const getFocusedElementText = async () => {
  const focusedElement = document.activeElement;

  if (!focusedElement) return '';

  const textParts = [];

  await walkFragmentNodes(focusedElement, textParts);

  return textParts.join(' ');
};

class TextToSpeech {
  constructor(settings = {}) {
    this.settings = {
      volume: 1,
      rate: 1,
      pitch: 1,
      lang: 'en-US',
      voice: null,
      ...settings
    };

    this.synth = window.speechSynthesis;
    this.utterance = null;
    this.voices = [];
    this.isPaused = false;
    this.isSpeaking = false;

    if (!this.synth) {
      throw new Error('Web Speech API not supported');
    }

    this.voices = this.synth.getVoices();
    if (this.voices.length === 0) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
        this.synth.onvoiceschanged = null;
      };
    }
  }

  configure(options = {}) {
    this.settings = {
      ...this.settings,
      ...options
    };
    return this;
  }

  async speak(text) {
    this.stop();

    this.utterance = this.#splitTextIntoUtteranceChunks(text);

    this.isPaused = false;
    this.isSpeaking = true;

    try {
      chrome.runtime.sendMessage({ type: 'PLAY' });
    } catch (e) {
      console.error('Error sending message:', e);
    }

    for (const utterance of this.utterance) {
      this.synth.speak(utterance);

      await new Promise((resolve, reject) => {
        utterance.onend = () => {
          resolve();
        };
        utterance.onerror = (e) => {
          reject(e);
        };
      });
    }
    return this;
  }

  #splitTextIntoUtteranceChunks(text) {
    const chunks = text.split('. ');

    return chunks.map((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);

      Object.assign(utterance, {
        volume: this.settings.volume,
        rate: this.settings.rate,
        pitch: this.settings.pitch,
        lang: this.settings.lang,
        voice: this.#findVoice(this.settings.voice)
      });

      return utterance;
    });
  }

  #findVoice(voiceIdentifier) {
    if (!voiceIdentifier) return null;
    return (
      this.voices.find(
        (v) => v.voiceURI === voiceIdentifier || v.name === voiceIdentifier
      ) || null
    );
  }

  getVoices() {
    return this.voices;
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();

      this.isPaused = false;
      this.isSpeaking = false;

      try {
        chrome.runtime.sendMessage({ type: 'STOP' });
      } catch (e) {
        console.error('Error sending message:', e);
      }
    }
    return this;
  }

  pause() {
    this.synth?.pause();
    this.isPaused = true;
    this.isSpeaking = false;

    try {
      chrome.runtime.sendMessage({ type: 'PAUSE' });
    } catch (e) {
      console.error('Error sending message:', e);
    }
    return this;
  }

  resume() {
    this.synth?.resume();
    this.isPaused = false;
    this.isSpeaking = true;

    try {
      chrome.runtime.sendMessage({ type: 'RESUME' });
    } catch (e) {
      console.error('Error sending message:', e);
    }
    return this;
  }
}

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

// listeners to handle keyboard shortcuts
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

// listeners to handle requests from the popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'PLAY') {
    const selectedText = await getSelectedText();

    if (textToSpeech.isPaused) {
      return textToSpeech.resume();
    }

    if (selectedText) {
      return textToSpeech.speak(selectedText);
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
