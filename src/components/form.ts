import type { UserSpecs } from '../background';
import { FormFieldset } from './form-fieldset';

const Form = (userSpecs: UserSpecs) => {
  const formElement = document.createElement('form');

  formElement.className = 'w-full';

  formElement.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    console.log('Form Data: ', Object.fromEntries(formData.entries()));
  };

  const formFieldsetElement = FormFieldset(userSpecs);

  formElement.appendChild(formFieldsetElement);

  return formElement;
};

export { Form };
