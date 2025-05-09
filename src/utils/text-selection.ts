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

const getFocusedElementText = async () => {
  const focusedElement = document.activeElement;

  if (!focusedElement) return '';

  const textParts: string[] = [];

  await walkFragmentNodes(focusedElement, textParts);

  return textParts.join(' ');
};

export { walkFragmentNodes, getSelectedText, getFocusedElementText };
