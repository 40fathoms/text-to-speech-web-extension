import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';

const Main = (config?: { className?: string }) => {
  const main = document.querySelector<HTMLElement>('#root')!;

  main.className = cn([
    'p-6 flex flex-col gap-7 items-center justify-center bg-gray-900 text-white w-[300px]',
    config?.className || ''
  ]);

  main.innerHTML = `
      <h1 class="text-3xl font-bold underline">${i18n('title')}</h1>
      <div
        class="flex gap-4 justify-center w-full
          [&>button]:cursor-pointer
          [&>button]:rounded-lg
          [&>button]:p-2
          [&>button]:w-full 
          [&>button]:h-10
          [&>button]:flex
          [&>button]:items-center
          [&>button]:justify-center
          [&>button]:bg-gray-800
          [&>button]:text-white
          [&>button:hover]:bg-gray-700
          [&>button:disabled]:bg-gray-200
          [&>button:disabled]:pointer-events-none
          [&>button:disabled]:text-gray-400"
      >
        <button id="play-button" disabled>play</button>
        <button id="pause-button" disabled>pause</button>
        <button id="stop-button" disabled>stop</button>
      </div>
    `;

  return main;
};

export { Main };
