import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The quiz you are looking for doesn’t exist.</p>
      <Link href="/quizzes" className="btn-primary mt-8 inline-block">
        Back to quizzes
      </Link>
    </div>
  );
}
