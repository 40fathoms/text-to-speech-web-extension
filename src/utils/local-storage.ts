import type TextToSpeech from '../classes/text-to-speech';

type UserSpecs = Omit<TextToSpeech['settings'], 'voice'> & {
  systemLanguage: string;
  shouldPlayOnFocus: boolean;
  shouldPlayOnSelection: boolean;
};

const key = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const handleGetLocalStorage = async (): Promise<UserSpecs | undefined> => {
  try {
    const result = await chrome.storage.local.get(key);

    if (result[key]) return JSON.parse(result[key]);
  } catch {
    return;
  }
};

const handleSetLocalStorage = async (value: string) => {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch {
    return;
  }
};

export { handleGetLocalStorage, handleSetLocalStorage };
