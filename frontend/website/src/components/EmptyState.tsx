type EmptyStateProps = {
  title: string;
  message: string;
  action?: React.ReactNode;
};

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="bmv-soft-card rounded-lg border border-dashed p-6 text-center">
      <p className="text-sm font-semibold text-[#1E120A]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#7A6050]">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
