export type brandId = "ctg" | "rat" | "fb" | "fbtc" | "obl" | "qf" | "rat" | "yp";

export interface Brand {
  id: brandId;
  name: string;
  logo: string;
  color: string;
  website: string;
  facebook?: string | null;
  instagram?: string | null;
  fontFamily: string;
  defaultBanner?: string;
}

export interface SignatureData {
    brandId: brandId;
    fName: string;
    lName: string;
    title: string;
    email: string;
    phone: string;
    directPhone?: string;
    photo: string | null;
    showBanner: boolean;
    banner: string | null;
}


export type UpdateFn = <K extends keyof SignatureData>(key: K, value: SignatureData[K]) => void;