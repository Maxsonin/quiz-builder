export function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Loading">
      <div className="size-8 animate-spin rounded-full border-4 border-border border-t-primary" />
    </div>
  );
}
