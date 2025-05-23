import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';
import type { UserSpecs } from '../utils/local-storage';

const Instructions = (userSpecs: UserSpecs) => {
  const systemLanguage = userSpecs.systemLang;

  const instructionsElement = document.createElement('div');

  const instructionsClassName = 'flex gap-4 flex-col w-full';

  Object.assign(instructionsElement, {
    id: 'text-to-speech-instructions',
    className: instructionsClassName
  });

  const instructionsElementIntro = document.createElement('p');

  const instructionsContentClassName =
    'text-sm [&>kbd]:px-1 [&>kbd]:mx-1 [&>kbd]:font-semibold [&>kbd]:text-gray-900 [&>kbd]:bg-white [&>kbd]:border [&>kbd]:border-gray-200 [&>kbd]:rounded-lg [&>kbd]:shadow-inner-custom';

  Object.assign(instructionsElementIntro, {
    className: cn([instructionsContentClassName, 'font-extrabold']),
    innerHTML: i18n('instructions-element-intro', systemLanguage)
  });

  const instructionsElementFirstInstruction = document.createElement('p');

  Object.assign(instructionsElementFirstInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-1', systemLanguage)
  });

  const instructionsElementSecondInstruction = document.createElement('p');

  Object.assign(instructionsElementSecondInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-2', systemLanguage)
  });

  const instructionsElementThirdInstruction = document.createElement('p');

  Object.assign(instructionsElementThirdInstruction, {
    className: instructionsContentClassName,
    innerHTML: i18n('instructions-element-step-3', systemLanguage)
  });

  instructionsElement.append(
    instructionsElementIntro,
    instructionsElementFirstInstruction,
    instructionsElementSecondInstruction,
    instructionsElementThirdInstruction
  );

  return instructionsElement;
};

export { Instructions };
