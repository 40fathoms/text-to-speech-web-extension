import { cn } from '../utils/cn';
import type { UserSpecs } from '../utils/local-storage';
import { PlayerButtonsContainer } from './player-buttons-container';

const PlayerContent = (userSpecs: UserSpecs) => {
  const playerContent = document.createElement('div');

  const playerContentClassName = cn([
    'flex flex-col gap-5 items-center justify-center',
    'p-3 pt-1 w-full h-fit bg-stone-900 border-b-4 border-amber-300'
  ]);

  Object.assign(playerContent, {
    className: playerContentClassName
  });

  const textToSpeechContainerElement = PlayerButtonsContainer(userSpecs);

  playerContent.append(textToSpeechContainerElement);

  return playerContent;
};

export { PlayerContent };
