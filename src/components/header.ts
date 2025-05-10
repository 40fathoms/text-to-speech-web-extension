import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';
import { Button } from './button';

type ElementAttributes = Omit<
  Partial<
    HTMLElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
  >,
  'innerHTML'
>;

type HeaderProps = ElementAttributes;

const Header = (props?: HeaderProps) => {
  const headerElement = document.createElement('header');

  const headerClassName = cn([
    'flex items-center justify-between gap-4 w-full',
    props?.className || ''
  ]);

  Object.assign(headerElement, {
    ...props,
    id: 'text-to-speech-header',
    className: headerClassName
  });

  headerElement.appendChild(
    Button({
      id: 'settings-button',
      props: {
        innerHTML: `
          fit content
          <span class="sr-only">${i18n('settings-button')}</span>
        `,
        onclick: (e) => {
          console.log('Settings button clicked', e);
        }
      }
    })
  );

  const headerElementTitle = document.createElement('h1');

  Object.assign(headerElementTitle, {
    className: 'align-self-center text-l text-center font-bold',
    innerHTML: i18n('title')
  });

  headerElement.appendChild(headerElementTitle);

  return headerElement;
};

export { Header };
