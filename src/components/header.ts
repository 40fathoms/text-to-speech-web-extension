import { appendSvgToElement } from '../utils/append-svg';
import { handleExpandSettings } from '../utils/expand-settings';
import { i18n } from '../utils/i18n';
import { Button } from './button';
import { cogIcon } from './icons';

const Header = async () => {
  const headerElement = document.createElement('header');

  const headerClassName =
    'z-2 p-3 flex items-center justify-between gap-4 w-full bg-stone-900';

  Object.assign(headerElement, {
    id: 'text-to-speech-header',
    className: headerClassName
  });

  const settingsButtonElement = Button({
    id: 'settings-button',
    props: {
      className: 'hover:outline-none transition-all duration-200',
      innerHTML: `<span class="sr-only">${i18n('settings-button')}</span>`,
      onclick() {
        handleExpandSettings();
      }
    }
  });

  appendSvgToElement({
    svgIcon: cogIcon,
    elementToAppend: settingsButtonElement,
    className: 'w-7 h-7'
  });

  headerElement.appendChild(settingsButtonElement);

  const headerElementTitle = document.createElement('h1');

  Object.assign(headerElementTitle, {
    className: 'align-self-center text-l text-center font-extrabold italic',
    innerHTML: i18n('title')
  });

  headerElement.appendChild(headerElementTitle);

  return headerElement;
};

export { Header };
