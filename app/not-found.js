import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold text-red-600">404 - Not Found</h2>
      <Link
        href="/"
        className="mt-4 text-white hover:bg-gray-400 rounded-sm p-2"
      >
        Povratak
      </Link>
    </div>
  );
}
