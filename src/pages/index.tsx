import Link from "next/link";

export default function main() {
  return (
    <div className="w-screen h-screen bg-slate-900 text-white flex flex-col justify-center items-center gap-5">
      <div className="text-4xl">Choose the play mode</div>
      <div className="text-3xl border p-4 grid place-content-center">
        <Link href={"/single"}>Single play mode</Link>
      </div>
      <div className="text-3xl border p-4 grid place-content-center">
        <Link href={"/multi"}>Multiplay mode</Link>
      </div>
    </div>
  );
}
