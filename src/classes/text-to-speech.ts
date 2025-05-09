import { handleSendRuntimeMessage } from '../utils/message-events';

class TextToSpeech {
  public settings: {
    volume: number;
    rate: number;
    pitch: number;
    lang: string;
    voice: string | null;
  };
  public synth: SpeechSynthesis;
  public utterance: SpeechSynthesisUtterance[];
  public voices: SpeechSynthesisVoice[];
  public isPaused: boolean;
  public isSpeaking: boolean;

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
    this.utterance = [];
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

  async speak(text: string) {
    this.stop();

    this.utterance = this.#splitTextIntoUtteranceChunks(text);

    this.isPaused = false;
    this.isSpeaking = true;

    handleSendRuntimeMessage({
      type: 'PLAY'
    });

    for (const utterance of this.utterance) {
      this.synth.speak(utterance);

      await new Promise((resolve, reject) => {
        utterance.onend = resolve;
        utterance.onerror = (e) => {
          reject(e);
        };
      });
    }
    return this;
  }

  #splitTextIntoUtteranceChunks(text: string) {
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

  #findVoice(voiceIdentifier: string | null) {
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

      handleSendRuntimeMessage({
        type: 'STOP'
      });
    }

    return this;
  }

  pause() {
    this.synth?.pause();
    this.isPaused = true;
    this.isSpeaking = false;

    handleSendRuntimeMessage({
      type: 'PAUSE'
    });

    return this;
  }

  resume() {
    this.synth?.resume();
    this.isPaused = false;
    this.isSpeaking = true;

    handleSendRuntimeMessage({
      type: 'RESUME'
    });

    return this;
  }
}

export { TextToSpeech as default };
