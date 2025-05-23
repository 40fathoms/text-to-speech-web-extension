import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';
import type { UserSpecs } from '../utils/local-storage';
import { Button } from './button';
import { Range } from './range';
import { Select } from './select';

const FormFieldset = (userSpecs: UserSpecs) => {
  const formFieldsetElement = document.createElement('fieldset');

  const formFieldsetClassName = cn([
    'flex flex-col items-center justify-center gap-2'
  ]);

  Object.assign(formFieldsetElement, {
    className: formFieldsetClassName,
    innerHTML: `<legend class="sr-only">${i18n('form-fieldset')}</legend>`
  });

  const voiceLangSelect = Select({
    id: 'lang',
    label: i18n('voice-language-label'),
    options: ['pt-BR', 'en-US'],
    value: userSpecs.lang
  });

  const volumeSlider = Range({
    id: 'volume',
    label: i18n('volume-label'),
    value: userSpecs.volume
  });

  const rateSlider = Range({
    id: 'rate',
    label: i18n('rate-label'),
    value: userSpecs.rate
  });

  const pitchSlider = Range({
    id: 'pitch',
    label: i18n('pitch-label'),
    value: userSpecs.pitch
  });

  const systemLangSelect = Select({
    id: 'systemLang',
    label: i18n('system-language-label'),
    options: ['pt-BR', 'en-US'],
    value: userSpecs.systemLang
  });

  const submitButtonElement = Button({
    id: 'submit-form-button',
    props: {
      innerHTML: `<span>${i18n('submit-form-button')}</span>`,
      className: 'w-full text-amber-300 my-3 py-2',
      type: 'submit'
    }
  });

  const dividerElement = document.createElement('hr');
  dividerElement.className = 'w-full border-t-2 border-amber-300 my-4';

  formFieldsetElement.append(
    voiceLangSelect,
    volumeSlider,
    rateSlider,
    pitchSlider,
    systemLangSelect,
    submitButtonElement,
    dividerElement
  );

  return formFieldsetElement;
};

export { FormFieldset };
