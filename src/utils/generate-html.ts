import { Header } from '../components/header';
import { Main } from '../components/main';

/**
 * Asynchronously generates and appends an HTML structure to the document body.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the HTML generation is complete.
 */
const generateHtml = async () => {
  const headerElement = Header();
  const mainElement = Main();

  document.body.className =
    'flex flex-col w-[250px] text-amber-300 font-mono bg-transparent';

  document.body.appendChild(headerElement);
  document.body.appendChild(mainElement);
};

export { generateHtml };
