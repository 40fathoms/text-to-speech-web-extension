import type TextToSpeech from './classes/text-to-speech';
import {
  handleGetLocalStorage,
  handleSetLocalStorage
} from './utils/local-storage';

type UserSpecs = Omit<TextToSpeech['settings'], 'voice'> & {
  systemLanguage: string;
  shouldPlayOnFocus: boolean;
  shouldPlayOnSelection: boolean;
};

handleGetLocalStorage().then((res) => {
  if (!res) {
    const newUserSpecs: UserSpecs = {
      lang: 'pt-BR',
      volume: 1,
      rate: 1,
      pitch: 1,
      systemLanguage: 'pt-BR',
      shouldPlayOnFocus: true,
      shouldPlayOnSelection: true
    };

    handleSetLocalStorage(JSON.stringify(newUserSpecs));
  }
});

export type { UserSpecs };
