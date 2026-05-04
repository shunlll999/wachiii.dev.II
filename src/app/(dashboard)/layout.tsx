'use client'

import { DashboardViewLayout } from "@/components/dashboard-ui";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, user: auth, error } = useAuth();
  const pathname = usePathname();
  const user = useMemo(() => auth, [auth]);
  const pathList = pathname.split('/').filter((p) => p !== '' && p !== 'console');


  console.log('user', user);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body style={{ background: '#797979', padding: 0, margin: 0 }}>
        <main>
           {error || !auth ? <div><div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }} >
          <div style={{ fontSize: 30, marginRight: 10 }}>🙏🏻</div>
          <div>
          I (wachii) apologize, but guests are not allowed in this area.
          </div>
          </div>
            <a href="/" style={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }} >Back to Home</a>
          </div> : <DashboardViewLayout user={{ name: user?.email || 'Wachiii', role: user?.role || 'Developer' }} param={pathList}>
              {loading ? <div>Loading...</div> : children}
            </DashboardViewLayout>}
          </main>
      </body>
    </html>
  )
}

export default DashboardLayout
