import { useState, useEffect, useRef } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';

interface CustomOption {
  value: string | number;
  render: () => JSX.Element;
}

interface CustomSelectProps {
  id: string;
  value: string | number;
  label: string;
  options: CustomOption[];
  onSelect: (option: CustomOption) => void;
  error: string | undefined;
}

function CustomSelect({
  id, value, label, options, onSelect, error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<CustomOption>(options.find((option) => option.value === value)!);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleSelect = (option: CustomOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <Form.Group className="mb-3" controlId={id} ref={ref}>
      <Form.Label>{label}</Form.Label>
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:ring"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            {selectedOption.render()}
          </div>
          <IoMdArrowDropdown />
        </button>

        {isOpen && (
          <ul className="absolute pl-0 z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
                tabIndex={0}
                onKeyDown={(event) => event.key === 'Enter' && handleSelect(option)}
              >
                {option.render()}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
}

export default CustomSelect;
