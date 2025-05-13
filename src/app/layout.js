import "./globals.css";

export const metadata = {
  title: "Stupid Simple Budget Calculator",
  description: "Created with NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen content-center">{children}</body>
    </html>
  );
}
