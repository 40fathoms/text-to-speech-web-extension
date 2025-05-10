type AppendSvgToElementInput = {
  svgIcon: string;
  elementToAppend: HTMLElement;
  className?: string;
};

const appendSvgToElement = ({
  svgIcon,
  elementToAppend,
  className
}: AppendSvgToElementInput) => {
  fetch(svgIcon)
    .then((res) => res.text())
    .then((svg) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const svgElement = doc.documentElement;

      if (className) svgElement.setAttribute('class', className);

      elementToAppend.appendChild(svgElement);
    });
};

export { appendSvgToElement };
