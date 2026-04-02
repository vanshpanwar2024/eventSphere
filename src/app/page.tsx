import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">EventSphere: Event Booking & Management</h1>
        <p className="mt-4 text-xl">The complete tech stack has been initialized.</p>
        <ul className="mt-8 list-disc list-inside">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </main>
  );
}
