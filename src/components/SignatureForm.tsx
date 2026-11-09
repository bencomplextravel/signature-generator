"use client";

import { BRANDS, BRAND_LIST } from "@/lib/brands";
import type { BrandId, SignatureData, UpdateFn } from "@/lib/types";

type Props = { data: SignatureData; onChange: UpdateFn };

function Field(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:outline-none"
      />
      {props.hint && <span className="mt-1 block text-xs text-gray-500">{props.hint}</span>}
    </label>
  );
}
export default function SignatureForm({ data, onChange }: Props) {
  const brand = BRANDS[data.brandId];
  const banners = brand.banners ?? [];

  // Choosing a banner also fills in its default click-through link
  const selectBanner = (url: string) => {
    onChange("banner", url);
    onChange("bannerLink", banners.find((b) => b.url === url)?.link ?? "");
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium">Brand</span>
        <select
          value={data.brandId}
          onChange={(e) => {
            // Switching brand resets the banner and photo
            onChange("brandId", e.target.value as BrandId);
            onChange("banner", null);
            onChange("bannerLink", "");
            onChange("showBanner", false);
            onChange("photo", null);
          }}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {BRAND_LIST.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" required value={data.fName} onChange={(v) => onChange("fName", v)} />
        <Field label="Last Name" required value={data.lName} onChange={(v) => onChange("lName", v)} />
      </div>

      <Field label="Job title" value={data.title} onChange={(v) => onChange("title", v)} 
        placeholder="Travel Consultant" hint="Use the title in your employment contract"/>

      <Field label="Email" type="email" required value={data.email} onChange={(v) => onChange("email", v)}
        placeholder="john@company.com.au" hint="Your work email address." />
      {brand.layout.phoneMode === "labelled" ? (
        <>
          <Field label="Direct line (D:)" type="tel" required value={data.directLine}
            onChange={(v) => onChange("directLine", v)}
            placeholder="08 8123 7123" hint={`Your direct number. Shown as "D:".`} />
          {!data.directLine.trim() && (
            <p className="-mt-3 text-xs text-red-600">Direct line is required.</p>
          )}
          <Field label="Main number (P:) (optional)" type="tel" value={data.phone}
            onChange={(v) => onChange("phone", v)}
            placeholder={brand.mainPhone ?? "1300 318 227 (Option 2)"}
            hint={`Shown as "P:". Leave blank to hide it.`} />
        </>
      ) : (
        <>
          <Field label="Phone" type="tel" value={data.phone} onChange={(v) => onChange("phone", v)}
            placeholder="08 8133 1083" hint="Your office number; ask IT if you're unsure." />
          <Field label="Second number (optional)" type="tel" value={data.directLine} onChange={(v) => onChange("directLine", v)}
            placeholder={brand.mainPhone ?? "+61 400 000 000"}
            hint={`Shown on the same line after a "|". Leave blank to hide it.`} />
        </>
      )}

      <label className="block">
        <span className="text-sm font-medium">Hours (optional)</span>
        <textarea
          rows={2}
          value={data.hours}
          placeholder={brand.hours ?? "Mon & Tue 9am - 5pm\nWednesday 9am - 12pm AWST"}
          onChange={(e) => onChange("hours", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:outline-none"
        />
        <span className="mt-1 block text-xs text-gray-500">
          {brand.hours
            ? `Leave blank to use the brand's hours (${brand.hours}). Fill in only if yours are different, e.g. part-time.`
            : "Leave blank to hide. Press Enter for a new line."}
        </span>
      </label>

      {/* Profile photo */}
      <Field
        label="Photo link (optional)"
        value={data.photo ?? ""}
        onChange={(v) => onChange("photo", v.trim() || null)}
        placeholder="https://complextravel.com.au/assets/email-signature/2025/ctg/staff/Kenny.png"
        hint="A public https:// link to a square photo. Ask IT to upload yours if it isn't there yet."
      />
      {data.photo && !data.photo.startsWith("https://") && (
        <p className="text-xs text-red-600">The link must start with https://</p>
      )}

      {/* Webinar banner: every brand except those with webinar: false (CTG) */}
      {brand.webinar !== false && (
        <fieldset className="space-y-3 rounded-md border border-gray-300 p-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={data.showBanner}
              onChange={(e) => {
                onChange("showBanner", e.target.checked);
                // pick the brand's first preset banner the first time it's switched on
                if (e.target.checked && !data.banner && banners.length > 0) selectBanner(banners[0].url);
              }}
            />
            Add webinar banner
          </label>

          {data.showBanner && (
            <>
              {banners.length > 1 && (
                <select
                  value={data.banner ?? ""}
                  onChange={(e) => selectBanner(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {banners.map((b) => (
                    <option key={b.url} value={b.url}>{b.label}</option>
                  ))}
                </select>
              )}
              {/* No preset banner for this brand yet: paste the image link */}
              {banners.length === 0 && (
                <>
                  <Field label="Banner image link" value={data.banner ?? ""}
                    onChange={(v) => onChange("banner", v.trim() || null)}
                    placeholder="https://complextravel.com.au/assets/email-signature/2025/.../WebinarBanner.png"
                    hint="A public https:// link to this month's webinar banner image." />
                  {data.banner && !data.banner.startsWith("https://") && (
                    <p className="-mt-2 text-xs text-red-600">The link must start with https://</p>
                  )}
                </>
              )}
              <Field label="Banner link" value={data.bannerLink ?? ""}
                onChange={(v) => onChange("bannerLink", v.trim())}
                placeholder={brand.website}
                hint="Where people go when they click the banner." />
            </>
          )}
        </fieldset>
      )}
    </div>

    
  );
}