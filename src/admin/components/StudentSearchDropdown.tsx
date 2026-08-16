'use client';

import { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/src/apiHelper/api';

type Student = {
  id: string;
  name: string;
  email: string;
  indexNo: string;
};

type StudentSearchDropdownProps = {
  value: string;
  onChange: (studentId: string) => void;
  placeholder?: string;
};

export default function StudentSearchDropdown({ value, onChange, placeholder = 'Select student...' }: StudentSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Failed to load students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.indexNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (student: Student) => {
    setSelectedStudent(student);
    onChange(student.id);
    setSearchTerm('');
    setIsOpen(false);
  };

  const displayValue = selectedStudent ? `${selectedStudent.name} (${selectedStudent.indexNo})` : searchTerm;

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
          {loading ? (
            <div className="px-5 py-4 text-sm text-[#7A7290]">Loading students...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="px-5 py-4 text-sm text-[#7A7290]">No students found</div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleSelect(student)}
                className="cursor-pointer px-5 py-3 text-sm text-[#1D1330] hover:bg-[#E4DEF2] font-[family-name:var(--font-body)]"
              >
                <div className="font-semibold">{student.name}</div>
                <div className="text-xs text-[#7A7290]">{student.indexNo}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
