import React from "react";

// Hộp chứa chung
export const ExerciseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-[Inter]">{children}</div>
  );
};

// bên trái
export const ExerciseLayoutLeft = ({ children }: { children: React.ReactNode }) => (
  <aside className="top-25 my-10 ml-10 hidden h-[85vh] w-[20%] flex-col items-center justify-between overflow-y-auto rounded-lg border border-gray-200 p-6 shadow-lg lg:sticky lg:flex">
    {children}
  </aside>
);

// trung tâm
export const ExerciseLayoutMain = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 overflow-y-auto p-10">{children}</main>
);

// Bên phải
export const ExerciseLayoutRight = ({ children }: { children: React.ReactNode }) => (
  <aside className="top-25 my-10 mr-10 hidden h-[85vh] w-[20%] flex-col justify-between gap-6 overflow-y-auto rounded-lg border-l border-gray-100 bg-white p-6 shadow-lg lg:sticky lg:flex">
    {children}
  </aside>
);
