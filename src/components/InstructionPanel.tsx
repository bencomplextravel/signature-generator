const SECTIONS = [
  {
    title: "Where do I find my details?",
    steps: [
      "Job title: as shown in your Google profile or employment contract.",
      "Direct phone: ask IT or check your phone system profile.",
      "Photo link: ask IT for the link to your staff photo on the company website.",
    ],
  },
  {
    title: "Add it to Gmail",
    steps: [
      "Click 'Copy signature'.",
      "In Gmail, click the gear icon → See all settings → General tab.",
      "Scroll to Signature → Create new → give it a name (e.g., 'CTG', 'FB', 'FBTC').",
      "For the best results, press 'Enter' a few times then paste into the signature box (Ctrl+V, or Cmd+V on a Mac). Links and the banner stay clickable.",
      "Set the corresponding signature for each brand's email and replies, then click Save Changes at the bottom.",
    ],
  },
];

export default function InstructionsPanel() {
  return (
    <div className="w-full max-w-170 space-y-2">
      <h2 className="text-lg font-semibold">How to use your signature</h2>
      {SECTIONS.map((s) => (
        <details key={s.title} className="rounded-md border bg-white p-4">
          <summary className="cursor-pointer font-medium">{s.title}</summary>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
            {s.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  );
}
