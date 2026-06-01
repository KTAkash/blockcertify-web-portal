function CloudIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 18H17C19.7614 18 22 15.7614 22 13C22 10.4293 20.0583 8.31278 17.5651 8.03634C16.8466 5.71379 14.6806 4 12.1 4C9.03164 4 6.5118 6.42491 6.35916 9.45538C3.86954 9.77969 2 11.9096 2 14.4412C2 16.9599 4.0401 19 6.55879 19H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Stepper() {
  return (
    <div className="mx-auto flex w-full max-w-190 items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">1</span>
        <span className="h-1 w-16 rounded-full bg-slate-100 sm:w-24" />
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400">2</span>
        <span className="h-1 w-16 rounded-full bg-slate-100 sm:w-24" />
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400">3</span>
    </div>
  );
}

export default function IssueCertificateSection() {
  return (
    <section className="space-y-10 py-8" id="issue-certificate">
      <Stepper />

      <div className="mx-auto w-full max-w-190 rounded-4xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-9">
        <h2 className="text-[48px] font-black tracking-tight text-slate-900">Issue New Academic Credential</h2>

        <form className="mt-8 space-y-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Student Full Name</span>
              <input
                placeholder="e.g. Alex Johnson"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-700 outline-none transition-colors focus:border-blue-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Student ID</span>
              <input
                placeholder="e.g. STU-102"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-700 outline-none transition-colors focus:border-blue-300"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Certificate Title</span>
            <input
              placeholder="e.g. Master of Data Science"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-700 outline-none transition-colors focus:border-blue-300"
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Upload Document Template</p>
            <label className="flex min-h-50 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/40 px-6 text-center text-slate-400 transition-colors hover:border-blue-300 hover:bg-blue-50/30">
              <span className="mb-3 text-slate-300">
                <CloudIcon />
              </span>
              <p className="text-[30px] font-medium text-slate-500">
                Drag and drop file or <span className="font-bold text-blue-600">browse</span>
              </p>
              <p className="mt-2 text-sm">PDF, JPG or PNG (max. 10MB)</p>
              <input type="file" className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-400 px-6 py-5 text-[40px] font-bold tracking-tight text-white shadow-[0_16px_30px_rgba(59,130,246,0.22)] transition-colors hover:bg-blue-500"
          >
            Sign & Commit to Blockchain
          </button>
        </form>
      </div>
    </section>
  );
}