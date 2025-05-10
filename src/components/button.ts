import { cn } from '../utils/cn';

type ElementAttributes = Partial<
  HTMLElement &
    HTMLButtonElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
>;

type ButtonProps = {
  id: string;
  props?: ElementAttributes;
};

const Button = ({ id, props = {} }: ButtonProps) => {
  const buttonElement = document.createElement('button');

  const buttonClassName = cn([
    'p-1 w-fit cursor-pointer rounded-lg flex items-center justify-center bg-transparent text-white',
    'hover:drop-shadow-sm hover:drop-shadow-amber-300 hover:outline-1 hover:outline-offset-1 hover:outline-solid hover:bg-transparent',
    'transition-all duration-100',
    'disabled:pointer-events-none disabled:opacity-20',
    props?.className || ''
  ]);

  Object.assign(buttonElement, {
    ...props,
    id,
    type: props?.type || 'button',
    className: buttonClassName
  });

  return buttonElement;
};

export { Button };
