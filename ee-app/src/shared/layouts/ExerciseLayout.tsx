import React from "react";

// Hộp chứa chung
export const ExerciseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col p-4 md:p-8 lg:flex-row lg:p-16">
      {children}
    </div>
  );
};

// Bên trái
export const ExerciseLayoutLeft = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <aside className="order-1 mb-6 flex w-full flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:sticky lg:top-[12vh] lg:mb-8 lg:h-[85vh] lg:w-[20%]">
    {children}
  </aside>
);

// Trung tâm
export const ExerciseLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <main className="order-2 flex-1 overflow-y-auto lg:px-8">{children}</main>
);

// Bên phải
export const ExerciseLayoutRight = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <aside className="order-3 mt-6 flex w-full flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:sticky lg:top-[12vh] lg:mt-0 lg:mb-8 lg:h-[85vh] lg:w-[20%]">
    {children}
  </aside>
);
