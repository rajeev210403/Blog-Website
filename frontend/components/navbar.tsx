'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { isAuthenticated, removeToken } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());

    // Listen for authentication state changes
    const handleAuthChange = () => setAuthenticated(isAuthenticated());

    // Optional: Use a custom event for login/logout updates
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  },[]);

  const handleLogout = () => {
    removeToken();
    setAuthenticated(false);
    window.dispatchEvent(new Event('authChange')); // Notify components about logout
    router.push('/');
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          DevBlog
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" >
            <Link href="/">Home</Link>
          </Button>

          <Button variant="ghost" >
            <Link href="/dashboard">Dashboard</Link> {/* Always visible */}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
          </Button> */}
          {authenticated ? (
            <>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}