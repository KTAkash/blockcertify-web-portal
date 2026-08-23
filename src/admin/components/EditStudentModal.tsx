'use client';

import { useState } from 'react';
import { apiClient } from '@/src/apiHelper/api';

type Student = {
  id: string;
  name: string;
  email: string;
  indexNo: string;
};

type EditStudentModalProps = {
  student: Student;
  onClose: () => void;
  onUpdate: () => void;
};

export default function EditStudentModal({ student, onClose, onUpdate }: EditStudentModalProps) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [indexNo, setIndexNo] = useState(student.indexNo);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !indexNo) {
      setError('All fields are required');
      return;
    }

    try {
      setUpdating(true);
      await apiClient.updateStudent(student.id, { name, email, indexNo });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update student:', error);
      setError('Failed to update student. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_30px_60px_rgba(30,14,66,0.35)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            Edit Student
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DEF2] bg-white text-[#7A7290] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-[12px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1D1330] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-[family-name:var(--font-body)]"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">
              Index Number
            </label>
            <input
              type="text"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
              className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1D1330] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-[family-name:var(--font-body)]"
              placeholder="Enter index number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1D1330] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-[family-name:var(--font-body)]"
              placeholder="Enter email address"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="flex-1 rounded-[10px] border border-[#E4DEF2] bg-white px-4 py-3 text-sm font-semibold text-[#7A7290] transition-colors hover:bg-[#E4DEF2] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="flex-1 rounded-[10px] bg-[#5B21B6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
            >
              {updating ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
