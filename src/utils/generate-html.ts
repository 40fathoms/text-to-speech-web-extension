import { Main } from '../components';

const generateHtml = async () => {
  const main = Main();

  document.body.appendChild(main);
};

export { generateHtml };
