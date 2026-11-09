"use client";

import { useRef, useState } from "react";
import { INITIAL_SIGNATURE_DATA } from "@/lib/brands";
import type { SignatureData, UpdateFn } from "@/lib/types";
import SignatureForm from "@/components/SignatureForm";
import PreviewFrame from "@/components/PreviewFrame";
import SignatureTemplate from "@/components/SignatureTemplate";
import ExportButton from "@/components/ExportButton";
import InstructionPanel from "@/components/InstructionPanel";

export default function Home() {
  const [data, setData] = useState<SignatureData>(INITIAL_SIGNATURE_DATA);
  const signatureRef = useRef<HTMLDivElement>(null);

  const update: UpdateFn = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[440px_1fr]">
      {/* Left: form */}
      <aside className="border-r bg-white p-6 lg:h-screen lg:overflow-y-auto">
        <h1 className="mb-6 text-2xl font-semibold">Create your email signature</h1>
        <SignatureForm data={data} onChange={update} />
      </aside>

      {/* Right: preview + actions */}
      <section className="flex flex-col items-center gap-6 p-6 lg:h-screen lg:overflow-y-auto">
        <PreviewFrame>
          <SignatureTemplate ref={signatureRef} data={data} />
        </PreviewFrame>
        <ExportButton targetRef={signatureRef} data={data} />
        <InstructionPanel />
      </section>
    </main>
  );
}
