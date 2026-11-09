"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { BRANDS } from "@/lib/brands";
import type { SignatureData } from "@/lib/types";

type Props = {
  targetRef: RefObject<HTMLDivElement | null>;
  data: SignatureData;
};

type Status =
  | { kind: "idle" }
  | { kind: "copied"; what: string }
  | { kind: "error"; message: string };

/** Things that must be fixed before the signature can be copied. */
function getProblems(data: SignatureData): string[] {
  const brand = BRANDS[data.brandId];
  const problems: string[] = [];
  if (!data.fName.trim()) problems.push("First name");
  if (!data.lName.trim()) problems.push("Last name");
  if (!data.email.trim()) problems.push("Email");
  if (brand.layout.phoneMode === "labelled" && !data.directLine.trim())
    problems.push("Direct line (D:)");
  if (data.photo && !data.photo.startsWith("https://"))
    problems.push("Photo link must start with https://");
  if (data.showBanner && data.banner && !data.banner.startsWith("https://"))
    problems.push("Banner image link must start with https://");
  return problems;
}

/** Fallback for browsers without the async Clipboard API: select the signature and copy it. */
function copyBySelection(node: HTMLElement): boolean {
  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  const ok = document.execCommand("copy");
  selection.removeAllRanges();
  return ok;
}

export default function ExportButton({ targetRef, data }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const problems = getProblems(data);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = (next: Status) => {
    setStatus(next);
    clearTimeout(timer.current);
    if (next.kind === "copied")
      timer.current = setTimeout(() => setStatus({ kind: "idle" }), 2500);
  };

  /** Copies the signature as formatted content, ready to paste into Gmail/Outlook signature settings. */
  const copySignature = async () => {
    const node = targetRef.current;
    if (!node) return;
    const html = node.innerHTML;
    const text = node.innerText;

    try {
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
      } else if (!copyBySelection(node)) {
        throw new Error("Copy was blocked by the browser.");
      }
      show({ kind: "copied", what: "Signature copied!" });
    } catch {
      // Some browsers refuse ClipboardItem; try the selection method before giving up.
      if (copyBySelection(node))
        show({ kind: "copied", what: "Signature copied!" });
      else
        show({
          kind: "error",
          message:
            "Couldn't copy. Select the signature preview and press Ctrl+C instead.",
        });
    }
  };

  /** Copies the raw HTML code, for email clients that take HTML (or for IT). */
  const copyHtml = async () => {
    const node = targetRef.current;
    if (!node) return;
    try {
      await navigator.clipboard.writeText(node.innerHTML);
      show({ kind: "copied", what: "HTML code copied!" });
    } catch {
      show({
        kind: "error",
        message: "Couldn't copy the HTML code. Please try again.",
      });
    }
  };

  const disabled = problems.length > 0;

  return (
    <div className="w-full max-w-150 space-y-2 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={copySignature}
          disabled={disabled}
          className="rounded-md bg-gray-900 px-5 py-2.5 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {status.kind === "copied" && status.what.startsWith("Signature")
            ? "✓ Copied!"
            : "Copy signature"}
        </button>
        <button
          type="button"
          onClick={copyHtml}
          disabled={disabled}
          className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          {status.kind === "copied" && status.what.startsWith("HTML")
            ? "✓ Copied!"
            : "Copy HTML code"}
        </button>
      </div>

      {/* Status sits on its own line so it doesn't push the buttons off-centre */}
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
          {status.kind === "copied" && (
            <span className="text-green-700">
              {status.what} Now paste it into your email signature settings.
            </span>
          )}
          {status.kind === "error" && (
            <span className="text-red-600">{status.message}</span>
          )}
      </p>

      {disabled && (
        <p className="text-sm text-red-600">
          Please fill in: {problems.join(", ")}.
        </p>
      )}
    </div>
  );
}
