'use client'
// ── Firebase (ต้อง init ก่อน component ใดๆ) ──────────────────────────
import '@/services/firebase'; // Initialize Firebase app

import { useState, type ChangeEvent } from "react";
import { auth, storage } from "@/services/firebase";
import { signInWithEmailAndPassword, type User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Login
  async function handleLogin(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement & { email: HTMLInputElement; password: HTMLInputElement };
    const email = target.email.value;
    const password = target.password.value;

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setUser(user);
  }

  // Upload รูป
  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    setImageURL(url);
    setLoading(false);
  }

  return (
    <div>
      {!user ? (
        // Login Form
        <div style={{
          display: 'block',
          height: 200,
          zIndex: 9999999,
          margin: '200px 0'
        }}>
          <form onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        // Upload Section
        <div style={{
          display: 'block',
          height: 200,
          zIndex: 9999999,
          margin: '200px 0'
        }}>
          <p>Logged in as: {user.email}</p>
          <input type="file" accept="image/*" onChange={handleUpload} />

          {loading && <p>Uploading...</p>}

          {/* Display รูปที่ upload */}
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded"
              style={{ width: "300px", marginTop: "20px" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
