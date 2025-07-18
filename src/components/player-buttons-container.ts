import { appendSvgToElement } from '../utils/append-svg';
import { i18n } from '../utils/i18n';
import type { UserSpecs } from '../utils/local-storage';
import { Button } from './button';
import { playButtonIcon, pauseButtonIcon, stopButtonIcon } from './icons';

const PlayerButtonsContainer = (userSpecs: UserSpecs) => {
  const systemLanguage = userSpecs.systemLang;

  const playerButtonsContainerElement = document.createElement('div');

  const containerClassName = 'w-full flex items-center gap-4';

  Object.assign(playerButtonsContainerElement, {
    id: 'text-to-speech-buttons',
    className: containerClassName
  });

  const playButtonElement = Button({
    id: 'play-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n(
        'play-button',
        systemLanguage
      )}</span>`,
      className: 'flex-1 h-[3rem]',
      disabled: true
    }
  });

  const pauseButtonElement = Button({
    id: 'pause-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n(
        'pause-button',
        systemLanguage
      )}</span>`,
      className: 'flex-1 h-[3rem]',
      disabled: true
    }
  });

  const stopButtonElement = Button({
    id: 'stop-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n(
        'stop-button',
        systemLanguage
      )}</span>`,
      className: 'flex-1 h-[3rem]',
      disabled: true
    }
  });

  appendSvgToElement({
    svgIcon: playButtonIcon,
    elementToAppend: playButtonElement,
    className: 'w-full h-full'
  });

  appendSvgToElement({
    svgIcon: pauseButtonIcon,
    elementToAppend: pauseButtonElement,
    className: 'w-full h-full'
  });

  appendSvgToElement({
    svgIcon: stopButtonIcon,
    elementToAppend: stopButtonElement,
    className: 'w-full h-full'
  });

  playerButtonsContainerElement.append(
    playButtonElement,
    pauseButtonElement,
    stopButtonElement
  );

  return playerButtonsContainerElement;
};

export { PlayerButtonsContainer };
