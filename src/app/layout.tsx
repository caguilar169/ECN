import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f8f9fb' }}>{children}</body>
    </html>
  );
}
