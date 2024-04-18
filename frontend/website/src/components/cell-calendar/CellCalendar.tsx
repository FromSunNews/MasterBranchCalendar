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
  let classDefault = "h-9 flex justify-center";
  if (!className?.includes("items-start")) classDefault += " items-center";

  return (
    <div className={clsx(className, classDefault)} onClick={onClick}>
      {children}
    </div>
  );
};

export default CellCalendar;
