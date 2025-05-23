type LabelElementAttributes = Partial<
  HTMLElement &
    HTMLLabelElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
>;

type SelectElementAttributes = Partial<
  HTMLElement &
    HTMLSelectElement & {
      [key: `data-${string}`]: string;
      [key: `aria-${string}`]: string;
    }
>;

type SelectProps<T> = {
  id: string;
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  labelProps?: LabelElementAttributes;
  selectProps?: SelectElementAttributes;
};

const Select = <T extends string>({
  id,
  label,
  options,
  value,
  onChange,
  labelProps = {},
  selectProps = {}
}: SelectProps<T>) => {
  const selectElement = document.createElement('select');

  Object.assign(selectElement, {
    ...selectProps,
    id,
    name: id,
    className: 'border rounded p-1',
    onchange: (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const selectedValue = target.value;
      onChange(selectedValue as T);
    }
  });

  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === value) option.selected = true;
    selectElement.append(option);
  });

  const selectLabelElement = document.createElement('label');

  Object.assign(selectLabelElement, {
    ...labelProps,
    htmlFor: id,
    innerHTML: `<span>${label}</span>`,
    className: 'flex flex-col gap-1 w-full'
  });

  selectLabelElement.append(selectElement);

  return selectLabelElement;
};

export { Select };
