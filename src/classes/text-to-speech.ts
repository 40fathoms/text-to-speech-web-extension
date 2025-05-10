import { handleSendRuntimeMessage } from '../utils/message-events';

interface TextToSpeechSettings {
  volume: number;
  rate: number;
  pitch: number;
  lang: string;
  voice: string | null;
}

/**
 * A class for managing text-to-speech operations using the Web Speech API.
 */
class TextToSpeech {
  public settings: TextToSpeechSettings;
  public synth: SpeechSynthesis;
  public utterance: SpeechSynthesisUtterance[];
  public voices: SpeechSynthesisVoice[];
  public isPaused: boolean;
  public isSpeaking: boolean;

  /**
   * Constructs a new TextToSpeech instance with default or provided settings.
   *
   * @param settings - Optional initial settings for speech synthesis.
   * @throws Will throw an error if the Web Speech API is not supported.
   */
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

  /**
   * Updates the current settings with new options.
   *
   * @param {Partial<TextToSpeechSettings>} options - Partial settings to update the existing configuration.
   * @returns The current instance for chaining.
   */
  configure(options: Partial<TextToSpeechSettings> = {}) {
    this.settings = {
      ...this.settings,
      ...options
    };
    return this;
  }

  /**
   * Speaks the given text using the configured settings.
   *
   * @param text - The text to be spoken.
   * @returns A promise that resolves once all utterances are spoken.
   */
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

  /**
   * Splits the input text into separate `SpeechSynthesisUtterance` objects.
   *
   * @param text - The full text to split into utterance chunks.
   * @returns An array of configured utterance objects.
   * @private
   */
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

  /**
   * Finds a matching voice based on its URI or name.
   *
   * @param voiceIdentifier - The voice name or URI to search for.
   * @returns The matched `SpeechSynthesisVoice` or `null` if not found.
   * @private
   */
  #findVoice(voiceIdentifier: string | null) {
    if (!voiceIdentifier) return null;
    return (
      this.voices.find(
        (v) => v.voiceURI === voiceIdentifier || v.name === voiceIdentifier
      ) || null
    );
  }

  /**
   * Returns the list of available voices on the system.
   *
   * @returns An array of `SpeechSynthesisVoice` objects.
   */
  getVoices() {
    return this.voices;
  }

  /**
   * Stops any ongoing speech and resets speaking state.
   *
   * @returns The current instance for chaining.
   */
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

  /**
   * Pauses the current speech.
   *
   * @returns The current instance for chaining.
   */
  pause() {
    this.synth?.pause();
    this.isPaused = true;
    this.isSpeaking = false;

    handleSendRuntimeMessage({
      type: 'PAUSE'
    });

    return this;
  }

  /**
   * Resumes paused speech.
   *
   * @returns The current instance for chaining.
   */
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
