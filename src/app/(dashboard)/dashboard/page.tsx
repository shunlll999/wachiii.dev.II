'use client'

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { getUserByUid } from "@/services/firebase";
import { DashboardViewLayout } from "@/components/dashboard-ui";
import withAuth from "@/context/ComponentsContextApp";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "lucide-react";

function App() {
  const { loading, user: auth, error } = useAuth();
  const user = useMemo(() => auth, [auth]);

  useEffect(() => {
    if (auth) {
      getUserByUid(auth.uid).then((userData) => {
        console.log("User data from Firestore:", userData);
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [auth]);

  if (error || !auth) return <div><div style={{
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
          </div>;

  return (
    <DashboardViewLayout user={{ name: user?.email || 'Wachiii', role: user?.role || 'Developer' }}>
      <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>{ loading ? 'Loading...' : user?.uid }</div>
    </DashboardViewLayout>
  );
}

export default withAuth(App);
