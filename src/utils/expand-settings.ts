const handleExpandSettings = () => {
  const expandButtonElement =
    document.querySelector<HTMLButtonElement>('#settings-button')!;

  const settingsContentElement =
    document.querySelector<HTMLButtonElement>('#settings-content')!;

  const navOpened = expandButtonElement.getAttribute('aria-expanded');

  if (!JSON.parse(navOpened || 'false')) {
    expandButtonElement.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      settingsContentElement.classList.add('active');
    }, 200);
    return;
  }

  expandButtonElement.setAttribute('aria-expanded', 'false');
  setTimeout(() => {
    settingsContentElement.classList.remove('active');
  }, 200);
};

export { handleExpandSettings };
