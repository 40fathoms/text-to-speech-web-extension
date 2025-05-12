import { Header } from '../components/header';
import { Main } from '../components/main';
// import { handleGetLocalStorage } from './local-storage';

/**
 * Asynchronously generates and appends an HTML structure to the document body.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the HTML generation is complete.
 */
const generateHtml = async () => {
  // const userSpecs = await handleGetLocalStorage();

  const userSpecs = {
    lang: 'pt-BR',
    volume: 1,
    rate: 1,
    pitch: 1,
    systemLanguage: 'pt-BR',
    shouldPlayOnFocus: true,
    shouldPlayOnSelection: true
  };

  const [headerElement, mainElement] = await Promise.all([
    Header(),
    Main(userSpecs!)
  ]);

  document.body.className =
    'flex flex-col w-[250px] text-amber-300 font-mono bg-transparent';

  document.body.append(headerElement, mainElement);
};

export { generateHtml };
