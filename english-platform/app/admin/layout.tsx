"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAdmin = user?.email === "твой_email@example.com"; // потом заменишь на роли
      setAllowed(isAdmin);
      if (!isAdmin) window.location.href = "/";
    });
    return () => unsubscribe();
  }, []);

  if (allowed === null) return <p className="p-10">Loading...</p>;
  return <>{children}</>;
}