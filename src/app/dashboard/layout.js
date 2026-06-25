export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#050505] via-[#0d1117] to-[#161b22] text-white">

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"
      />

      <main className="relative z-10 w-full">
        <div className="p-5 lg:p-15">
          {children}
        </div>
      </main>

    </div>
  );
}