import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';

type ElementAttributes = Omit<
  Partial<
    HTMLElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
  >,
  'innerHTML'
>;

type InstructionsProps = ElementAttributes;

const Instructions = (props?: InstructionsProps) => {
  const instructionsElement = document.createElement('div');

  const instructionsClassName = cn([
    'flex gap-4 flex-col w-full',
    props?.className || ''
  ]);

  Object.assign(instructionsElement, {
    ...props,
    id: 'text-to-speech-instructions',
    className: instructionsClassName
  });

  const instructionsElementIntro = document.createElement('p');

  const instructionsContentClassName =
    'text-sm [&>kbd]:px-1 [&>kbd]:mx-1 [&>kbd]:font-semibold [&>kbd]:text-gray-900 [&>kbd]:bg-white [&>kbd]:border [&>kbd]:border-gray-200 [&>kbd]:rounded-lg [&>kbd]:shadow-inner-custom';

  Object.assign(instructionsElementIntro, {
    className: cn([instructionsContentClassName, 'font-extrabold']),
    innerHTML: i18n('instructions-element-intro')
  });

  const instructionsElementFirstInstruction = document.createElement('p');

  Object.assign(instructionsElementFirstInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-1')
  });

  const instructionsElementSecondInstruction = document.createElement('p');

  Object.assign(instructionsElementSecondInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-2')
  });

  const instructionsElementThirdInstruction = document.createElement('p');

  Object.assign(instructionsElementThirdInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-3')
  });

  instructionsElement.appendChild(instructionsElementIntro);
  instructionsElement.appendChild(instructionsElementFirstInstruction);
  instructionsElement.appendChild(instructionsElementSecondInstruction);
  instructionsElement.appendChild(instructionsElementThirdInstruction);

  return instructionsElement;
};

export { Instructions };
