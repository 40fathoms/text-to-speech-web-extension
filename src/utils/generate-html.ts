import { Header } from '../components/header';
import { Main } from '../components/main';
import { handleGetLocalStorage } from './local-storage';

const defaultUserSpecs = {
  lang: 'pt-BR',
  volume: 1,
  rate: 1,
  pitch: 1,
  systemLang: 'pt-BR' as const
};

/**
 * Asynchronously generates and appends an HTML structure to the document body.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the HTML generation is complete.
 */
const generateHtml = async () => {
  const userSpecs = (await handleGetLocalStorage()) || defaultUserSpecs;

  const [headerElement, mainElement] = await Promise.all([
    Header(userSpecs!),
    Main(userSpecs!)
  ]);

  document.body.className =
    'flex flex-col w-[250px] text-amber-300 font-mono bg-transparent';

  document.body.append(headerElement, mainElement);
};

export { generateHtml };
