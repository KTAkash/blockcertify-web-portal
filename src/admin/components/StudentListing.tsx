'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/src/apiHelper/api';
import AddStudentForm from './AddStudentForm';

type Student = {
  id: string;
  name: string;
  email: string;
  indexNo: string;
};

function ViewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StudentListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.indexNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = async (newStudent: { id: string; name: string; email: string; indexNo: string }) => {
    try {
      await apiClient.addStudent({
        name: newStudent.name,
        email: newStudent.email,
        indexNo: newStudent.indexNo,
      });
      await loadStudents();
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await apiClient.deleteStudent(id);
      await loadStudents();
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <section className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4DEF2] px-6 py-5">
        <h3 className="text-lg font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Student Listing</h3>
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="rounded-[10px] bg-[#5B21B6] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]"
        >
          Add Student
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1D1330] placeholder:text-[#7A7290] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-[family-name:var(--font-body)]"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent"></div>
              <p className="mt-4 text-sm text-[#7A7290]">Loading students...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#E4DEF2] bg-[#E4DEF2]/70 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#7A7290]">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Index No</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-[#E4DEF2] last:border-b-0">
                  <td className="px-6 py-5">
                    <div className="font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.indexNo}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#1D1330]">{student.name}</td>
                  <td className="px-6 py-5 text-sm text-[#7A7290]">{student.email}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-full border border-[#E4DEF2] p-2 text-[#7C3AED] transition-colors hover:bg-[#E4DEF2]">
                        <ViewIcon />
                      </button>
                      <button className="rounded-full border border-[#E4DEF2] p-2 text-[#7C3AED] transition-colors hover:bg-[#E4DEF2]">
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="rounded-full border border-rose-200 p-2 text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {isAddFormOpen && (
        <AddStudentForm 
          onClose={() => setIsAddFormOpen(false)}
          onAddStudent={handleAddStudent}
        />
      )}
    </section>
  );
}
