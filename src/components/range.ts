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
  onChange?: (value: number) => void;
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
    min: min.toString(),
    max: max.toString(),
    step: step.toString(),
    value: value.toString(), // important: value must be set after min, max and step
    className: 'w-full text-amber-300',
    ...(!!onChange && {
      onchange: (e: Event) => {
        const target = e.target as HTMLInputElement;
        const selectedValue = parseFloat(target.value);
        labelProps.innerHTML = `<span>${label} (${selectedValue})</span>`;
        onChange(selectedValue);
      }
    })
  });

  const selectLabelElement = document.createElement('label');

  Object.assign(selectLabelElement, {
    ...labelProps,
    htmlFor: id,
    innerHTML: `<span>${label} (${value})</span>`,
    className: 'flex flex-col gap-1 w-full'
  });

  selectLabelElement.append(rangeInputElement);

  rangeInputElement.addEventListener('input', () => {
    selectLabelElement.querySelector(
      'span'
    )!.textContent = `${label} (${rangeInputElement.value})`;
  });

  return selectLabelElement;
};

export { Range };
