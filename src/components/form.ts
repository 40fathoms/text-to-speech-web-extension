import type { UserSpecs } from '../utils/local-storage';
import { handleSendTabsMessage } from '../utils/message-events';
import { FormFieldset } from './form-fieldset';

const Form = (userSpecs: UserSpecs) => {
  const formElement = document.createElement('form');

  formElement.className = 'w-full';

  formElement.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const formEntries = Object.fromEntries(formData.entries());

    handleSendTabsMessage({
      type: 'SUBMIT_SETTINGS_FORM',
      formEntries
    });
  };

  const formFieldsetElement = FormFieldset(userSpecs);

  formElement.appendChild(formFieldsetElement);

  return formElement;
};

export { Form };
