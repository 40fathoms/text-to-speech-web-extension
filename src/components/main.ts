import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';

const MainContent = (config?: { className?: string }) => {
  const mainContent = document.createElement('div');

  mainContent.className = cn([
    'p-6 flex flex-col gap-7 items-center justify-center bg-gray-900 text-white w-[300px]',
    config?.className || ''
  ]);

  mainContent.innerHTML = `
      <h1 class="align-self-center text-xl text-center font-bold">${i18n(
        'title'
      )}</h1>
      <div id="text-to-speech-buttons"></div>
    `;

  const textToSpeechButtons = mainContent.querySelector<HTMLDivElement>(
    '#text-to-speech-buttons'
  )!;

  textToSpeechButtons.className = cn([
    'flex gap-4 justify-center w-full [&>button]:cursor-pointer [&>button]:rounded-lg [&>button]:p-2 [&>button]:w-full  [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-gray-800 [&>button]:text-white [&>button:hover]:bg-gray-700 [&>button:disabled]:bg-gray-200 [&>button:disabled]:pointer-events-none [&>button:disabled]:text-gray-400',
    config?.className || ''
  ]);

  textToSpeechButtons.innerHTML = `
        <button id="play-button" disabled>play</button>
        <button id="pause-button" disabled>pause</button>
        <button id="stop-button" disabled>stop</button>
    `;

  return mainContent;
};

export { MainContent };
