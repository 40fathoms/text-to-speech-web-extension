import type { UserSpecs } from '../background';
import { FormFieldset } from './form-fieldset';

const Form = (userSpecs: UserSpecs) => {
  const formElement = document.createElement('form');

  formElement.className = 'w-full';

  const formFieldsetElement = FormFieldset(userSpecs);

  formElement.appendChild(formFieldsetElement);

  return formElement;
};

export { Form };
