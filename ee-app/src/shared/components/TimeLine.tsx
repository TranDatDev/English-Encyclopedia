import React from "react";

type TimelineItem = {
  name: string;
  duration: number;
  children?: TimelineItem[];
  description?: string; // Optional description for tooltips
};

type TimelineProps = {
  items: TimelineItem[];
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const total = items.reduce((acc, i) => acc + i.duration, 0);
  return (
    <div className="w-full mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row h-auto">
        {items.map((item, idx) => {
          const percent = (item.duration / total) * 100;
          // Professional color palette for IELTS
          const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-teal-500",
          ];
          const bg = colors[idx % colors.length];

          return (
            <div
              key={idx}
              className={`relative flex flex-col min-h-[120px] sm:min-h-[100px] items-center justify-start text-white font-medium transition-all duration-300 hover:shadow-xl hover:z-10 ${bg}`}
              style={{ width: `${percent}%` }}
              role="region"
              aria-label={`${item.name}, ${item.duration} minutes`}
            >
              {/* Parent section label */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 text-center w-full">
                <span className="font-semibold text-sm sm:text-base">
                  {item.name}
                </span>
                <span className="text-xs opacity-90">{item.duration} phút</span>
              </div>

              {/* Tooltip for parent section */}
              {item.description && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 z-20 w-64 sm:w-80 shadow-lg">
                  {item.description}
                </div>
              )}

              {/* Child timeline (subsections) with thin borders */}
              {item.children && item.children.length > 0 && (
                <div className="w-full flex flex-row mt-auto border-t border-white/30">
                  {item.children.map((child, cIdx) => {
                    const childPercent = (child.duration / item.duration) * 100;
                    const childBg = `${colors[idx % colors.length].replace(
                      "500",
                      "600"
                    )}`; // Darker shade for children

                    return (
                      <div
                        key={cIdx}
                        className={`flex items-center justify-center text-xs text-white font-medium ${childBg} h-8 sm:h-10 ${
                          cIdx < item.children!.length - 1
                            ? "border-r border-white/20"
                            : ""
                        }`}
                        style={{
                          width: `${childPercent}%`,
                          borderWidth:
                            cIdx < item.children!.length - 1 ? "1px" : "0",
                        }}
                        role="region"
                        aria-label={`${child.name}, ${child.duration} minutes`}
                      >
                        <span className="truncate px-1.5">{child.name}</span>
                        {/* Child tooltip */}
                        {child.description && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 z-20 w-64 sm:w-80 shadow-lg">
                            {child.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
