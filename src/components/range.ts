type LabelElementAttributes = Partial<
  HTMLElement &
    HTMLLabelElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
>;

type RangeInputElementAttributes = Partial<
  HTMLElement &
    HTMLInputElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
>;

type RangeProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  labelProps?: LabelElementAttributes;
  rangeInputProps?: RangeInputElementAttributes;
};

const Range = ({
  id,
  label,
  value,
  min = 0,
  max = 1,
  step = 0.1,
  onChange,
  labelProps = {},
  rangeInputProps = {}
}: RangeProps) => {
  const rangeInputElement = document.createElement('input');

  Object.assign(rangeInputElement, {
    ...rangeInputProps,
    type: 'range',
    id,
    name: id,
    value: value.toString(),
    min: min.toString(),
    max: max.toString(),
    step: step.toString(),
    className: 'w-full text-amber-300',
    onchange: (e: Event) => {
      const target = e.target as HTMLInputElement;
      const selectedValue = parseFloat(target.value);
      labelProps.innerHTML = `<span>${label} (${selectedValue})</span>`;
      onChange(selectedValue);
    }
  });

  const selectLabelElement = document.createElement('label');

  Object.assign(selectLabelElement, {
    ...labelProps,
    htmlFor: id,
    innerHTML: `<span>${label} (${value})</span>`,
    className: 'flex flex-col gap-1 w-full'
  });

  selectLabelElement.append(rangeInputElement);

  return selectLabelElement;

  //   const wrapper = document.createElement('label');
  //   wrapper.className = 'flex flex-col gap-1 w-full';

  //   const range = document.createElement('input');
  //   range.type = 'range';
  //   range.id = id;
  //   range.name = id;
  //   range.value = value.toString();
  //   range.min = min.toString();
  //   range.max = max.toString();
  //   range.step = step.toString();
  //   range.className = 'w-full text-amber-300';

  //   wrapper.innerHTML = `<span>${label} (${value})</span>`;
  //   wrapper.appendChild(range);

  //   // Optional: Live value update
  //   range.addEventListener('input', () => {
  //     wrapper.querySelector('span')!.textContent = `${label} (${range.value})`;
  //   });
};

export { Range };
