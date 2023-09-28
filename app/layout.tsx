import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/toast-provider'
 
export const metadata = {
  title: 'Next.js 13 with Clerk',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}