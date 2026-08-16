'use client';

import { useState } from 'react';

function CloudIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 18H17C19.7614 18 22 15.7614 22 13C22 10.4293 20.0583 8.31278 17.5651 8.03634C16.8466 5.71379 14.6806 4 12.1 4C9.03164 4 6.5118 6.42491 6.35916 9.45538C3.86954 9.77969 2 11.9096 2 14.4412C2 16.9599 4.0401 19 6.55879 19H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type AddStudentFormProps = {
  onClose: () => void;
  onAddStudent: (student: { id: string; name: string; email: string; indexNo: string }) => void;
};

export default function AddStudentForm({ onClose, onAddStudent }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    indexNo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      id: Date.now().toString(),
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-7 shadow-[0_10px_30px_rgba(29,19,48,0.04)] sm:p-9">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[32px] font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Add New Student</h2>
            <button 
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4DEF2] text-[#7A7290] transition-colors hover:bg-[#7C3AED] hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Student Full Name</span>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  required
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-5 py-4 text-lg text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Index Number</span>
                <input
                  value={formData.indexNo}
                  onChange={(e) => setFormData({ ...formData, indexNo: e.target.value })}
                  placeholder="e.g. STU-102"
                  required
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-5 py-4 text-lg text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex.johnson@university.edu"
                required
                className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-5 py-4 text-lg text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
              />
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-6 py-5 text-lg font-bold text-[#7A7290] transition-colors hover:bg-[#E4DEF2] font-[family-name:var(--font-display)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-[10px] bg-[#5B21B6] px-6 py-5 text-lg font-bold text-white shadow-[0_16px_30px_rgba(91,33,182,0.22)] transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
