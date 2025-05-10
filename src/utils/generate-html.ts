import { Main } from '../components';

/**
 * Asynchronously generates and appends an HTML structure to the document body.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the HTML generation is complete.
 */
const generateHtml = async () => {
  const main = Main();

  document.body.appendChild(main);
};

export { generateHtml };
