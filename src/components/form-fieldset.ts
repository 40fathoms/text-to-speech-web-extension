import type { UserSpecs } from '../background';
import { cn } from '../utils/cn';
import { i18n } from '../utils/i18n';

const createLabeledSelect = (
  id: string,
  label: string,
  options: string[],
  selected: string
) => {
  const wrapper = document.createElement('label');
  wrapper.className = 'flex flex-col gap-1 w-full';

  const select = document.createElement('select');
  select.id = id;
  select.name = id;
  select.className = 'border rounded p-1';

  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === selected) option.selected = true;
    select.appendChild(option);
  });

  wrapper.innerHTML = `<span>${label}</span>`;
  wrapper.appendChild(select);

  return wrapper;
};

const createLabeledRange = (
  id: string,
  label: string,
  value: number,
  min = 0,
  max = 1,
  step = 0.1
) => {
  const wrapper = document.createElement('label');
  wrapper.className = 'flex flex-col gap-1 w-full';

  const range = document.createElement('input');
  range.type = 'range';
  range.id = id;
  range.name = id;
  range.value = value.toString();
  range.min = min.toString();
  range.max = max.toString();
  range.step = step.toString();
  range.className = 'w-full text-amber-300';

  wrapper.innerHTML = `<span>${label} (${value})</span>`;
  wrapper.appendChild(range);

  // Optional: Live value update
  range.addEventListener('input', () => {
    wrapper.querySelector('span')!.textContent = `${label} (${range.value})`;
  });

  return wrapper;
};

const FormFieldset = (userSpecs: UserSpecs) => {
  const formFieldsetElement = document.createElement('fieldset');

  const formFieldsetClassName = cn([
    'flex flex-col items-center justify-center gap-2'
  ]);

  Object.assign(formFieldsetElement, {
    className: formFieldsetClassName,
    innerHTML: `<legend class="sr-only">${i18n('form-fieldset')}</legend>`
  });

  const voiceLangSelect = createLabeledSelect(
    'lang',
    i18n('voice-language-label'),
    ['pt-BR', 'en-US'],
    userSpecs.lang
  );

  const volumeSlider = createLabeledRange(
    'volume',
    i18n('volume-label'),
    userSpecs.volume
  );
  const rateSlider = createLabeledRange(
    'rate',
    i18n('rate-label'),
    userSpecs.rate
  );

  const pitchSlider = createLabeledRange(
    'pitch',
    i18n('pitch-label'),
    userSpecs.pitch
  );

  const dividerElement = document.createElement('hr');
  dividerElement.className = 'w-full border-t-2 border-amber-300 my-4';

  const systemLangSelect = createLabeledSelect(
    'systemLanguage',
    i18n('system-language-label'),
    ['pt-BR', 'en-US'],
    userSpecs.systemLanguage
  );

  formFieldsetElement.append(
    voiceLangSelect,
    volumeSlider,
    rateSlider,
    pitchSlider,
    dividerElement,
    systemLangSelect
  );

  return formFieldsetElement;
};

export { FormFieldset };
