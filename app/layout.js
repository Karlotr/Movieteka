/* 
  Filename: Layoutpage
  Note: Just wrapped page within Providers component(client) for githubAuth, Auth components is used for Login/Logout button. Placed here to be accessable within whole website.
  Also included metadata for SEO.
*/

import "./globals.css";
import { Providers } from "./components/Providers";
import Auth from "./components/Auth";

export const metadata = {
  title: "Movieteka",
  description: "Aplikacija za pronalazak filmova",
  keywords: ["Movies", "Shows", "Actors"],
  authors: [
    {
      name: "Karlo JuniorDev attendee",
      url: "https://digitalnadalmacija.hr/juniordev",
    },
  ],
  icons: {
    icon: "/main-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@JuniorDev",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        <Providers>
          <Auth></Auth>
          {children}
        </Providers>
      </body>
    </html>
  );
}
