interface DesktopShellProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  onClose?: () => void;
}

export default function DesktopShell({
  children,
  align = "start",
}: DesktopShellProps) {
  const alignClass =
    align === "start"
      ? "left-0"
      : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "right-0";

  return (
    <div
      className={`absolute top-20 ${alignClass} w-full max-w-212.5 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200 z-50`}
    >
      {children}
    </div>
  );
}
