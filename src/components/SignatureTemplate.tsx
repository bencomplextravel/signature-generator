/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode, Ref } from "react";
import { BRANDS } from "@/lib/brands";
import type { SignatureData } from "@/lib/types";

type Props = { data: SignatureData; ref?: Ref<HTMLDivElement> };

// Shared text styles, taken from the existing HTML templates.
const ROW: CSSProperties = { fontSize: 14, color: "#666" };
const TEXT: CSSProperties = { fontSize: 12, color: "#333", textDecoration: "none" };

/**
 * One template for every brand. Everything that differs between brands
 * (colours, photo side, icon sizes, phone format, socials…) comes from brand.layout in brands.ts.
 *
 * Note: Tailwind's base styles make <img> display:block and collapse table borders,
 * so those are set explicitly here to match how the HTML looks in an email client.
 */
export default function SignatureTemplate({ data, ref }: Props) {
  const brand = BRANDS[data.brandId];
  const L = brand.layout;
  const font = brand.fontFamily;

  const fullName = `${data.fName} ${data.lName}`.trim() || "Your Name";
  const hours = data.hours.trim() || brand.hours || "";
  const websiteLabel = brand.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  // ---- Contact rows -------------------------------------------------------
  type Row = { key: string; icon?: string; content: ReactNode };
  const rows: Row[] = [];

  const email = data.email || "you@company.com.au";
  rows.push({
    key: "email",
    icon: brand.icons.email,
    content: <a href={`mailto:${email}`} style={{ ...TEXT, wordBreak: "break-word" }}>{email}</a>,
  });

  if (L.phoneMode === "labelled") {
    // D: is required (directLine); P: is optional and entered by the user (phone)
    if (data.directLine) rows.push({ key: "direct", icon: brand.icons.phone, content: <><b>D:</b> {data.directLine}</> });
    if (data.phone) rows.push({ key: "main", icon: brand.icons.main ?? brand.icons.phone, content: <><b>P:</b> {data.phone}</> });
  } else {
    const numbers = [data.phone, data.directLine].filter(Boolean).join(" | ");
    if (numbers) rows.push({ key: "phone", icon: brand.icons.phone, content: numbers });
  }

  if (L.websiteRow) {
    rows.push({
      key: "web",
      icon: brand.icons.web,
      content: <a href={brand.website} style={TEXT}>{websiteLabel}</a>,
    });
  }

  // ---- Hours line ---------------------------------------------------------
  const hoursLines = hours.split("\n").flatMap((line, i) => (i === 0 ? [line] : [<br key={i} />, line]));
  const hoursLine = hours && (
    <div style={{ ...ROW, marginTop: 10 }}>
      <span style={{ ...TEXT, paddingLeft: L.hoursStyle === "plain" ? 0 : 2 }}>
        {L.hoursStyle === "plain"
          ? <><strong>Hours:</strong> {hoursLines}</>
          : <i><strong>Hours: {hoursLines}</strong></i>}
      </span>
    </div>
  );

  // ---- Cells --------------------------------------------------------------
  const photoImg = data.photo && (
    <img src={data.photo} width={L.photo.size} height={L.photo.size} alt="Profile Photo"
      style={{
        display: "inline-block", verticalAlign: "bottom", height: "auto", width: "100%",
        maxWidth: L.photo.size, ...L.photo.style,
      }} />
  );

  const photoCell = data.photo && (
    <td style={{ width: `${L.photo.cellWidth}%`, verticalAlign: "middle", textAlign: L.photo.align }}>
      {L.photo.ring ? (
        <div style={{ display: "inline-block", padding: 4, borderRadius: "100%", backgroundImage: L.photo.ring }}>
          {photoImg}
        </div>
      ) : photoImg}
    </td>
  );

  const detailsCell = (
    <td style={{ verticalAlign: "middle", padding: L.detailsPadding, width: data.photo ? `${100 - L.photo.cellWidth}%` : "100%" }}>
      <div style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>{fullName}</div>
      {data.title && <div style={ROW}>{data.title}</div>}

      {L.hoursPosition === "afterTitle" && hoursLine}

      {rows.map((r, i) => (
        <div key={r.key} style={{ ...ROW, marginTop: i === 0 ? 15 : 5 }}>
          {r.icon && (
            <img src={r.icon} width={L.iconSize} height={L.iconSize} alt=""
              style={{ display: "inline-block", width: L.iconSize, height: L.iconSize, verticalAlign: "middle", border: 0 }} />
          )}{" "}
          <span style={{ ...TEXT, paddingLeft: L.iconGap }}>{r.content}</span>
        </div>
      ))}

      {L.hoursPosition === "afterContacts" && hoursLine}

      {brand.socials.length > 0 && (
        <div style={{ marginTop: 10 }}>
          {brand.socials.map((s, i) => (
            <a key={s.url} href={s.url} target="_blank" style={{ marginLeft: i === 0 ? 0 : 5 }}>
              <img src={s.icon} width={20} height={20} alt={s.label}
                style={{ display: "inline-block", width: 20, height: 20, border: 0 }} />
            </a>
          ))}
        </div>
      )}
    </td>
  );

  // ---- Signature ----------------------------------------------------------
  return (
    <div ref={ref}>
      <table cellPadding={0} cellSpacing={0} border={0} width="100%"
        style={{ borderCollapse: "separate", padding: 15, ...L.container }}>
        <tbody>
          <tr>
            <td align="left" style={{ fontFamily: font, paddingTop: 10 }}>
              <table cellPadding={0} cellSpacing={0} border={0} width="100%">
                <tbody>
                  <tr>
                    {L.photo.side === "left" ? <>{photoCell}{detailsCell}</> : <>{detailsCell}{photoCell}</>}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Optional webinar banner (sits above the brand banner) */}
          {data.showBanner && data.banner && (
            <tr>
              <td style={{ textAlign: "center" }}>
                <a href={data.bannerLink || undefined} target="_blank">
                  <img src={data.banner} width="100%" alt="Webinar"
                    style={{ display: "block", width: "100%", paddingTop: 25, border: 0 }} />
                </a>
              </td>
            </tr>
          )}

          {/* Brand banner */}
          <tr>
            <td>
              <img src={brand.logo} width="100%" alt={brand.name}
                style={{ display: "block", width: "100%", paddingTop: data.showBanner && data.banner ? Math.max(L.bannerPaddingTop, 10) : L.bannerPaddingTop, border: 0 }} />
            </td>
          </tr>

          {/* Legal line */}
          {brand.legal && (
            <tr>
              <td style={{ fontFamily: font }}>
                <p style={{ margin: `${L.legalFontSize}px 0`, lineHeight: "16px", padding: "0 10px", fontSize: L.legalFontSize, color: "#777", textAlign: "center" }}>
                  {brand.legalTitle && <><b>{brand.legalTitle}</b> - </>}
                  {brand.legal}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
