import React from "react";
import { formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return <div className={className}>{formatDateTime(date)}</div>;
};

export default FormattedDateTime;
