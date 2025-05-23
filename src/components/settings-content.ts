import { cn } from '../utils/cn';
import type { UserSpecs } from '../utils/local-storage';
import { Form } from './form';
import { Instructions } from './instructions';

const SettingsContent = (userSpecs: UserSpecs) => {
  const settingsContent = document.createElement('div');

  const settingsContentClassName = cn([
    'absolute z-1 top-0 left-0 flex flex-col gap-5 items-center',
    'p-3 h-100 w-full bg-stone-900 border-b-4 border-amber-300 overflow-auto',
    'transform-[translateY(-100%)] transition-all duration-250 invisible'
  ]);

  Object.assign(settingsContent, {
    id: 'settings-content',
    className: settingsContentClassName
  });

  const formElement = Form(userSpecs);
  const instructionsElement = Instructions();

  settingsContent.append(formElement, instructionsElement);

  return settingsContent;
};

export { SettingsContent };
