'use client';

import { useState, useRef, useEffect } from 'react';

const DEGREE_TITLES = [
  'Bachelor of Science in Computer Science',
  'Bachelor of Arts in Economics',
  'Bachelor of Engineering',
  'Master of Science in Data Science',
  'Master of Business Administration',
  'Master of Arts in Psychology',
  'Doctor of Philosophy in Computer Science',
  'Doctor of Medicine',
  'Bachelor of Laws',
  'Master of Public Health',
];

type DegreeTitleDropdownProps = {
  value: string;
  onChange: (title: string) => void;
  placeholder?: string;
};

export default function DegreeTitleDropdown({ value, onChange, placeholder = 'Select degree title...' }: DegreeTitleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTitles = DEGREE_TITLES.filter(title =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (title: string) => {
    onChange(title);
    setSearchTerm('');
    setIsOpen(false);
  };

  const displayValue = value || searchTerm;

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={isOpen ? searchTerm : displayValue}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-5 py-4 text-lg text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] shadow-lg">
          {filteredTitles.length === 0 ? (
            <div className="px-5 py-4 text-sm text-[#7A7290]">No degree titles found</div>
          ) : (
            filteredTitles.map((title) => (
              <div
                key={title}
                onClick={() => handleSelect(title)}
                className="cursor-pointer px-5 py-3 text-sm text-[#1D1330] hover:bg-[#E4DEF2] font-[family-name:var(--font-body)]"
              >
                {title}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
