import { MainContent } from '../components/main';

/**
 * Asynchronously generates and appends an HTML structure to the document body.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the HTML generation is complete.
 */
const generateHtml = async () => {
  const main = document.querySelector<HTMLElement>('#root')!;

  main.className = 'flex w-fit bg-stone-900 border-b-4 border-amber-300';

  const mainContent = MainContent();

  main.appendChild(mainContent);

  document.body.appendChild(main);
};

export { generateHtml };
