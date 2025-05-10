/**
 * Recursively walks through a DOM node and extracts meaningful text content.
 * Special handling is included for `<img>` tags to use their `alt` attribute.
 *
 * @param {Node} node - The DOM node to walk.
 * @param {string[]} textParts - An array that accumulates extracted text parts (used during recursion).
 * @returns A promise that resolves when the node and its children have been processed.
 */
const walkFragmentNodes = async (node: Node, textParts: string[] = []) => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if ((node as HTMLImageElement)?.tagName === 'IMG') {
      const altText = (node as HTMLImageElement).alt?.trim();
      if (altText) textParts.push(altText);
    } else {
      for (const child of node.childNodes) {
        await walkFragmentNodes(child, textParts);
      }
      textParts.push('. ');
    }

    return;
  }

  const text = node.textContent?.trim() || '';
  if (text) textParts.push(text);
};

/**
 * Extracts and normalizes text from the current user selection in the browser.
 * Walks the selected DOM fragment and collects all relevant text, including image alt text.
 *
 * @returns A promise that resolves to a single string of cleaned and normalized selected text.
 */
const getSelectedText = async () => {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    console.log('No selection found.');
    return '';
  }

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const textParts: string[] = [];

  for (const fragmentChildNode of fragment.childNodes) {
    await walkFragmentNodes(fragmentChildNode, textParts);
  }

  const finalText = textParts.join('').replace(/\s+/g, ' ').trim();

  return finalText;
};

/**
 * Extracts and normalizes text from the currently focused element on the page.
 * This includes walking its DOM structure and collecting text content or image alt text.
 *
 * @returns A promise that resolves to a string containing the focused element’s text content.
 *
 */
const getFocusedElementText = async () => {
  const focusedElement = document.activeElement;

  if (!focusedElement) return '';

  const textParts: string[] = [];

  await walkFragmentNodes(focusedElement, textParts);

  return textParts.join(' ');
};

export { walkFragmentNodes, getSelectedText, getFocusedElementText };
