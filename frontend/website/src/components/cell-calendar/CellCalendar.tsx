import clsx from "clsx";
import React from "react";

interface CellCalendarProps extends React.PropsWithChildren {
  className?: string;
  onClick?: () => void | undefined;
}

const CellCalendar: React.FC<CellCalendarProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <div
      className={clsx("h-9 flex items-center justify-center", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CellCalendar;
