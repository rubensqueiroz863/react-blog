import { JSX } from "react";

interface LoadingSpinnerProps {
  message?: string;
  width?: string;
  height?: string;
}

export default function LoadingSpinner({
  message = "",
  width = "w-8",
  height = "h-8",
}: LoadingSpinnerProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {message && <p>{message}</p>}
      <div
        className={`${width} ${height} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
