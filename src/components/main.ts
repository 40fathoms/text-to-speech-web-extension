import type { UserSpecs } from '../utils/local-storage';
import { PlayerContent } from './player-content';
import { SettingsContent } from './settings-content';

const Main = async (userSpecs: UserSpecs) => {
  const mainElement = document.querySelector<HTMLElement>('#root')!;

  const mainElementClassName = 'relative';

  Object.assign(mainElement, {
    id: 'text-to-speech-main',
    className: mainElementClassName
  });

  const playerContent = PlayerContent(userSpecs);
  const settingsContent = SettingsContent(userSpecs);

  mainElement.append(playerContent, settingsContent);

  return mainElement;
};

export { Main };
