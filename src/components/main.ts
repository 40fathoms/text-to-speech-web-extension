import { cn } from '../utils/cn';
import { Header } from './header';
import { TextToSpeechButtonsContainer } from './tts-buttons-container';

type ElementAttributes = Omit<
  Partial<
    HTMLElement &
      HTMLButtonElement & {
        [key: `data-${string}`]: string;
        [key: `aria-${string}`]: string;
      }
  >,
  'innerHTML'
>;

const MainContent = (props: ElementAttributes = {}) => {
  const mainContent = document.createElement('div');

  const mainContentClassName = cn([
    'flex flex-col gap-7 items-center justify-center p-4 w-[250px] text-amber-300',
    props?.className || ''
  ]);

  Object.assign(mainContent, {
    ...props,
    className: mainContentClassName
  });

  const headerElement = Header();
  const textToSpeechContainerElement = TextToSpeechButtonsContainer();

  mainContent.appendChild(headerElement);
  mainContent.appendChild(textToSpeechContainerElement);

  return mainContent;
};

export { MainContent };
