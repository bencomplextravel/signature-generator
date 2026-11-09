import type { BrandId, Brand, BrandLayout, SignatureData } from "./types";

const ASSETS = "https://complextravel.com.au/assets/email-signature/2025";
const LEGAL = (tradingAs: string) =>
    `Complex Travel Group Pty Ltd, trading as '${tradingAs}', ABN: 58 627 126 774, ACN: 627 126 774.`;

/** Shared by the "airfare" templates (Flat Beds, QFlyer, RoundAbout, YPremium): details left, photo right. */
const AIRFARE_LAYOUT: Omit<BrandLayout, "container"> = {
    photo: { side: "right", cellWidth: 35, align: "left", size: 150, style: { borderRadius: "50%" } },
    detailsPadding: "0 4%",
    iconSize: 18,
    iconGap: 2,
    phoneMode: "labelled",
    hoursPosition: "afterContacts",
    hoursStyle: "italic",
    bannerPaddingTop: 0,
    legalFontSize: 10,
};

export const BRANDS: Record<BrandId, Brand> = {
    ctg: {
        id: "ctg",
        name: "Complex Travel Group",
        logo: `${ASSETS}/ctg/CTGB1.png`,
        website: "https://complextravel.com.au",
        fontFamily: "Arial, sans-serif",
        legalTitle: "Complex Travel Group",
        webinar: false, // CTG signatures don't get a webinar banner
        legal: "ABN: 58 627 126 774, ACN: 627 126 774.",
        icons: {
            email: `${ASSETS}/ctg/ctg-email.png`,
            phone: `${ASSETS}/ctg/ctg-phone.png`,
            web: `${ASSETS}/ctg/Web.png`,
        },
        socials: [],
        layout: {
            container: { maxWidth: 550, borderRadius: 30, backgroundColor: "rgb(243,242,242)" },
            photo: { side: "right", cellWidth: 30, align: "center", size: 130, style: { borderRadius: "50%" } },
            detailsPadding: "0 4%",
            iconSize: 18,
            iconGap: 2,
            phoneMode: "combined",
            websiteRow: true,
            bannerPaddingTop: 10,
            legalFontSize: 11,
        },
    },
    fb: {
        id: "fb",
        name: "Flat Beds",
        logo: `${ASSETS}/flatbeds/fb-email-banner-final4.png`,
        website: "https://flatbeds.com.au",
        fontFamily: "Arial, sans-serif",
        mainPhone: "1300 318 227 (Option 3)",
        hours: "Mon-Fri 9am - 5pm AEST",
        legal: LEGAL("Flat Beds"),
        icons: {
            email: `${ASSETS}/flatbeds/email2.png`,
            phone: `${ASSETS}/flatbeds/phone2.png`,
            main: `${ASSETS}/flatbeds/phone3.png`,
        },
        socials: [
            { label: "Home", url: "https://flatbeds.com.au", icon: `${ASSETS}/flatbeds/web.png` },
            { label: "Facebook", url: "https://www.facebook.com/flatbeds.com.au", icon: `${ASSETS}/flatbeds/fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/flatbeds.com.au/", icon: `${ASSETS}/flatbeds/ig.png` },
        ],
        layout: {
            ...AIRFARE_LAYOUT,
            container: {
                maxWidth: 550, borderRadius: 30, backgroundColor: "#e8e9fc",
                backgroundImage: "linear-gradient(180deg, #e1edf8 0%, #e8e9fc 50%)",
            },
            photo: { ...AIRFARE_LAYOUT.photo, ring: "linear-gradient(60deg, #9165ab, #abb7e9)" },
        },
    },
    fbtc: {
        id: "fbtc",
        name: "Flat Beds Tour & Cruise",
        logo: `${ASSETS}/flatbedstc/FB-T&C-Banner11.png`,
        website: "https://flatbedstravel.com.au",
        fontFamily: "Arial, sans-serif",
        mainPhone: "1300 318 227 (Option 4)",
        hours: "Mon-Fri 8.30am - 4.30pm AEST",
        legal: LEGAL("Flat Beds"),
        icons: {
            email: `${ASSETS}/flatbedstc/email2.png`,
            phone: `${ASSETS}/flatbedstc/phone2.png`,
        },
        socials: [
            { label: "Home", url: "https://flatbedstravel.com.au", icon: `${ASSETS}/flatbedstc/web2.png` },
            { label: "Facebook", url: "https://www.facebook.com/flatbeds.tour.cruise", icon: `${ASSETS}/flatbedstc/fb2.png` },
            { label: "Instagram", url: "https://www.instagram.com/flatbeds.tour.cruise/", icon: `${ASSETS}/flatbedstc/ig2.png` },
        ],
        layout: {
            container: {
                maxWidth: 600, borderRadius: 30, backgroundColor: "#edeff0",
                backgroundImage: `url('${ASSETS}/flatbedstc/signature-bg-watermark3.png')`,
                backgroundSize: "200px", backgroundRepeat: "no-repeat", backgroundPosition: "90% 10%",
            },
            photo: { side: "left", cellWidth: 35, align: "center", size: 130, style: { borderRadius: "50%" } },
            detailsPadding: "0 0 0 20px",
            iconSize: 15,
            iconGap: 5,
            phoneMode: "combined",
            hoursPosition: "afterContacts",
            hoursStyle: "italic",
            bannerPaddingTop: 5,
            legalFontSize: 10,
        },
    },
    obl: {
        id: "obl",
        name: "On Board Luxury",
        logo: `${ASSETS}/onboard/onboard-email-banner-final.png`,
        website: "https://onboardluxury.com.au",
        fontFamily: "Arial, sans-serif",
        // The OBL template has no legal line.
        icons: {
            email: `${ASSETS}/onboard/email.png`,
            phone: `${ASSETS}/onboard/phone.png`,
        },
        socials: [
            { label: "Home", url: "https://onboardluxury.com.au", icon: `${ASSETS}/onboard/web.png` },
            { label: "Facebook", url: "https://www.facebook.com/onboardluxury", icon: `${ASSETS}/onboard/fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/onboard.luxury/", icon: `${ASSETS}/onboard/ig.png` },
        ],
        layout: {
            container: {
                maxWidth: 600, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#FCF7F3",
                backgroundImage: "linear-gradient(180deg, #9EB6DB24 0%, #FCF7F3 70%)",
            },
            photo: {
                side: "left", cellWidth: 35, align: "center", size: 130,
                style: { borderRadius: "40% 40% 10% 40%", border: "3px solid #96b0d8" },
            },
            detailsPadding: "0 0 0 20px",
            iconSize: 15,
            iconGap: 5,
            phoneMode: "combined",
            bannerPaddingTop: 20,
            legalFontSize: 10,
        },
    },
    qf: {
        id: "qf",
        name: "QFlyer",
        logo: `${ASSETS}/qflyer/qf-email-banner.png`,
        website: "https://qflyer.com.au",
        fontFamily: "Arial, sans-serif",
        mainPhone: "1300 318 227 (Option 2)",
        hours: "Mon-Fri 9am - 5pm AEST",
        // NOTE: the supplied QFlyer template says "trading as 'RoundAbout Travel'". Check whether it should be QFlyer.
        legal: LEGAL("RoundAbout Travel"),
        icons: {
            email: `${ASSETS}/qflyer/qf-email.png`,
            phone: `${ASSETS}/qflyer/qf-phone.png`,
            main: `${ASSETS}/qflyer/qf-main.png`,
        },
        socials: [
            { label: "Home", url: "https://qflyer.com.au", icon: `${ASSETS}/qflyer/qf-web.png` },
            { label: "Facebook", url: "https://www.facebook.com/qflyer/", icon: `${ASSETS}/qflyer/qf-fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/qflyerau/", icon: `${ASSETS}/qflyer/qf-ig.png` },
        ],
        layout: { ...AIRFARE_LAYOUT, container: { maxWidth: 550, borderRadius: 30, backgroundColor: "#fde8eb" } },
    },
    rat: {
        id: "rat",
        name: "RoundAbout Travel",
        logo: `${ASSETS}/rat/rat-email-banner-final.png`,
        website: "https://roundabouttravel.com.au",
        fontFamily: "Arial, sans-serif",
        mainPhone: "1300 318 227 (Option 3)",
        hours: "Mon-Fri 9am - 5pm AEST",
        legal: LEGAL("RoundAbout Travel"),
        icons: {
            email: `${ASSETS}/rat/rat-email.png`,
            phone: `${ASSETS}/rat/rat-phone.png`,
            main: `${ASSETS}/rat/rat-main.png`,
        },
        socials: [
            { label: "Home", url: "https://roundabouttravel.com.au", icon: `${ASSETS}/rat/rat-web.png` },
            { label: "Facebook", url: "https://www.facebook.com/RoundAboutTravel/", icon: `${ASSETS}/rat/rat-fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/roundabouttravel.com.au/", icon: `${ASSETS}/rat/rat-ig.png` },
        ],
        layout: { ...AIRFARE_LAYOUT, container: { maxWidth: 550, borderRadius: 30, backgroundColor: "#E2ECF5" } },
    },
    twct: {
        id: "twct",
        name: "The Well Connected Traveller",
        logo: `${ASSETS}/twct/twct-email-banner-3.png`,
        website: "https://thewellconnectedtraveller.com.au",
        fontFamily: "Arial, sans-serif",
        legal: LEGAL("The Well Connected Traveller"),
        icons: {
            email: `${ASSETS}/twct/twct-email.png`,
            phone: `${ASSETS}/twct/twct-phone.png`,
        },
        socials: [
            { label: "Home", url: "https://thewellconnectedtraveller.com.au/", icon: `${ASSETS}/twct/twct-web.png` },
            { label: "Facebook", url: "https://www.facebook.com/TheWellConnectedTraveller/", icon: `${ASSETS}/twct/twct-fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/thewellconnectedtraveller/", icon: `${ASSETS}/twct/twct-ig.png` },
            { label: "LinkedIn", url: "https://www.linkedin.com/company/the-well-connected-traveller-twct/about/", icon: `${ASSETS}/twct/twct-linkedin.png` },
        ],
        layout: {
            container: { maxWidth: 600, border: "1px solid #ddd", borderRadius: 30, backgroundColor: "rgb(243,242,242)" },
            photo: { side: "left", cellWidth: 35, align: "center", size: 160, style: { borderRadius: "50%" } },
            detailsPadding: "0 4%",
            iconSize: 18,
            iconGap: 2,
            phoneMode: "combined",
            hoursPosition: "afterTitle",
            hoursStyle: "plain",
            bannerPaddingTop: 10,
            legalFontSize: 10,
        },
    },
    yp: {
        id: "yp",
        name: "YPremium",
        logo: `${ASSETS}/yp/yp-email-banner.png`,
        website: "https://ypremium.com.au",
        fontFamily: "Arial, sans-serif",
        mainPhone: "1300 318 227 (Option 2)",
        hours: "Mon-Fri 9am - 5pm AEST",
        legal: LEGAL("Y Premium"),
        icons: {
            email: `${ASSETS}/yp/yp-email.png`,
            phone: `${ASSETS}/yp/yp-phone.png`,
            main: `${ASSETS}/yp/yp-main.png`,
        },
        socials: [
            { label: "Home", url: "https://ypremium.com.au", icon: `${ASSETS}/yp/yp-web.png` },
            { label: "Facebook", url: "https://www.facebook.com/YPremium.com.au/", icon: `${ASSETS}/yp/yp-fb.png` },
            { label: "Instagram", url: "https://www.instagram.com/ypremiumau/", icon: `${ASSETS}/yp/yp-ig.png` },
        ],
        layout: { ...AIRFARE_LAYOUT, container: { maxWidth: 550, borderRadius: 30, backgroundColor: "#e4f1e7" } },
    },
};

export const BRAND_LIST = Object.values(BRANDS);

export const INITIAL_SIGNATURE_DATA: SignatureData = {
    brandId: "ctg",
    fName: "",
    lName: "",
    title: "",
    email: "",
    phone: "",
    directLine: "",
    hours: "",
    photo: null,
    showBanner: false,
    banner: null,
};
