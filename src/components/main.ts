import { PlayerContent } from './player-content';
import { SettingsContent } from './settings-content';

const Main = async () => {
  const main = document.querySelector<HTMLElement>('#root')!;

  main.className = 'relative';

  const playerContent = PlayerContent();
  const settingsContent = SettingsContent();

  main.appendChild(playerContent);
  main.appendChild(settingsContent);

  return main;
};

export { Main };
