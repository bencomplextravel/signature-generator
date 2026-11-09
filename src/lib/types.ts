import type { CSSProperties } from "react";

export type BrandId = "ctg" | "fb" | "fbtc" | "obl" | "qf" | "rat" | "twct" | "yp";

/** Icon image URLs for the contact rows. Any missing icon is simply left out. */
export interface BrandIcons {
  email?: string;
  /** Staff phone / direct line ("D:") */
  phone?: string;
  /** Brand's main number ("P:") */
  main?: string;
  /** Only used when the website is shown as a contact row (CTG). */
  web?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface WebinarBanner {
  label: string;
  url: string;
  /** Default click-through link for this banner. */
  link?: string;
}

/** Everything that differs visually between brand templates. */
export interface BrandLayout {
  /** Style of the outer table: background colour/gradient/watermark, border, radius, max width. */
  container: CSSProperties;

  photo: {
    side: "left" | "right";
    /** Width of the photo column, in percent (details get the rest). */
    cellWidth: number;
    align: "left" | "center";
    /** Max width/height in px. */
    size: number;
    /** Extra styles on the photo (shape, border). */
    style?: CSSProperties;
    /** Optional gradient ring behind the photo (Flat Beds). */
    ring?: string;
  };

  /** Padding of the details column, e.g. "0 4%" or "0 0 0 20px". */
  detailsPadding: string;

  /** 18 or 15 px, and the gap between icon and text. */
  iconSize: number;
  iconGap: number;

  /**
   * How phone numbers are shown:
   * - "combined": one row, "phone | direct line | main number"
   * - "labelled": "D: direct line" row and "P: main number" row
   */
  phoneMode: "combined" | "labelled";

  /** Show the website as a contact row (CTG) instead of a social icon. */
  websiteRow?: boolean;

  /** Where the hours line goes, and how it looks. */
  hoursPosition?: "afterTitle" | "afterContacts";
  hoursStyle?: "italic" | "plain";

  /** Space above the brand banner, in px. */
  bannerPaddingTop: number;

  legalFontSize: number;
}

export interface Brand {
  id: BrandId;
  name: string;
  /** The brand banner image shown under the details. */
  logo: string;
  website: string;
  fontFamily: string;
  /** Brand's main number, e.g. "1300 318 227 (Option 3)". */
  mainPhone?: string;
  /** Default opening hours, e.g. "Mon-Fri 9am - 5pm AEST". */
  hours?: string;
  /** Bold text at the start of the legal line (CTG). */
  legalTitle?: string;
  legal?: string;
  icons: BrandIcons;
  socials: SocialLink[];
  layout: BrandLayout;
  /** Set to false to hide the webinar banner option for this brand. Defaults to on. */
  webinar?: boolean;
  /** Preset webinar banners. If empty, staff paste a banner image link instead. */
  banners?: WebinarBanner[];
}

export interface SignatureData {
  brandId: BrandId;
  fName: string;
  lName: string;
  title: string;
  email: string;
  phone: string;
  directLine: string;
  /** Overrides the brand's default hours (e.g. part-time hours). */
  hours: string;
  photo: string | null;
  showBanner: boolean;
  banner: string | null;
  bannerLink?: string;
}

export type UpdateFn = <K extends keyof SignatureData>(key: K, value: SignatureData[K]) => void;
