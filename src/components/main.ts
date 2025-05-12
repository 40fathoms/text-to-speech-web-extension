import type { UserSpecs } from '../background';
import { PlayerContent } from './player-content';
import { SettingsContent } from './settings-content';

const Main = async (userSpecs: UserSpecs) => {
  const main = document.querySelector<HTMLElement>('#root')!;

  main.className = 'relative';

  const playerContent = PlayerContent();
  const settingsContent = SettingsContent(userSpecs);

  main.append(playerContent, settingsContent);

  return main;
};

export { Main };
