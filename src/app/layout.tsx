import '@/../style/theme.css'
import '@/../style/css.css'
import { fetchSession } from '@/../script/state/repository/session'
import AppClientProvider from '@/dom/organ/layout/AppClientProvider'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Byte City',
  description: 'Web POV | Web Game: Byte City',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await fetchSession()

  return (<>
    <html lang="en" style={{background:"black", }}>
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect"href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap`}
          />
      </head>
      <body className="ma-0 h-min-90vh " > 
        <AppClientProvider session={session}>
          <> {children}  </>
        </AppClientProvider>
        <Analytics />
      </body>
    </html>
  </>)
}