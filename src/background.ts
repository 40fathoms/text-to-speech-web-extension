import {
  handleGetLocalStorage,
  handleSetLocalStorage,
  type UserSpecs
} from './utils/local-storage';

handleGetLocalStorage().then((res) => {
  if (!res) {
    const newUserSpecs: UserSpecs = {
      lang: 'pt-BR',
      volume: 1,
      rate: 1,
      pitch: 1,
      systemLang: 'pt-BR'
    };

    handleSetLocalStorage(JSON.stringify(newUserSpecs));
  }
});
