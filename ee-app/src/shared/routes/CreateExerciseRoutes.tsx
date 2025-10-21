import React from "react";
import type { RouteObject } from "react-router";

import { ExerciseSetupWrapper } from "@/shared/components/exercise/components/ExerciseSetupWrapper";

/**
 *
 * @param list Danh sách bài tập với slug và dữ liệu tương ứng
 * @param Component Thành phần React để hiển thị bài tập
 * @param randomize Tính năng xáo trộn câu hỏi (mặc định: true)
 * @param oneTryOnly Tính năng chỉ được chọn một lần (mặc định: true)
 * @returns Danh sách các đối tượng RouteObject cho từng bài tập
 */
export function createExerciseRoutes<T>(
  list: { slug: string; data: T }[],
  Component: React.FC<{
    exercise: T;
    randomize?: boolean;
    oneTryOnly?: boolean;
  }>,
  randomize = true,
  oneTryOnly = true,
): RouteObject[] {
  return list.map(({ slug, data }) => ({
    path: slug,
    element: (
      <ExerciseSetupWrapper
        Component={Component}
        exercise={data}
        defaultRandomize={randomize}
        defaultOneTryOnly={oneTryOnly}
      />
    ),
  }));
}
