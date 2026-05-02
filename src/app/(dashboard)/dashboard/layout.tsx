'use client'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body style={{ background: '#797979', padding: 0, margin: 0 }}>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default DashboardLayout
