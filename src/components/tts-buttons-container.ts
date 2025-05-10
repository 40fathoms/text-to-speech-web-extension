import { appendSvgToElement } from '../utils/append-svg';
import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';
import { Button } from './button';
import { playButtonIcon, pauseButtonIcon, stopButtonIcon } from './icons';

type ElementAttributes = Omit<
  Partial<
    HTMLElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
  >,
  'innerHTML'
>;

type TextToSpeechButtonsContainerProps = ElementAttributes;

const TextToSpeechButtonsContainer = (
  props?: TextToSpeechButtonsContainerProps
) => {
  const textToSpeechContainerElement = document.createElement('div');

  const containerClassName = cn([
    'w-full flex items-center gap-4',
    props?.className || ''
  ]);

  Object.assign(textToSpeechContainerElement, {
    ...props,
    id: 'text-to-speech-buttons',
    className: containerClassName
  });

  const playButtonElement = Button({
    id: 'play-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n('play-button')}</span>`,
      className: 'flex-1 h-[3rem]'
      // disabled: true
    }
  });

  const pauseButtonElement = Button({
    id: 'pause-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n('pause-button')}</span>`,
      className: 'flex-1 h-[3rem]',
      disabled: true
    }
  });

  const stopButtonElement = Button({
    id: 'stop-button',
    props: {
      innerHTML: `<span class="sr-only">${i18n('stop-button')}</span>`,
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

  textToSpeechContainerElement.appendChild(playButtonElement);
  textToSpeechContainerElement.appendChild(pauseButtonElement);
  textToSpeechContainerElement.appendChild(stopButtonElement);

  return textToSpeechContainerElement;
};

export { TextToSpeechButtonsContainer };
