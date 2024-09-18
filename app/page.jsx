// app/page.js
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Map from '@/components/Map';

export default function Home() {
  // Hooks must be at the top level
  const { data: session, status } = useSession();
  const [location, setLocation] = useState(null);
  const [panoramaUrl, setPanoramaUrl] = useState(null);

  useEffect(() => {
    if (session) {
      // Fetch saved location
      fetch('/api/get-location')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.location) {
            setLocation(data.location);
            // Fetch panorama image
            fetch('/api/get-panorama')
              .then((res) => res.json())
              .then((panoramaData) => {
                if (panoramaData.success) {
                  setPanoramaUrl(panoramaData.streetViewUrl);
                }
              })
              .catch((error) => console.error('Error fetching panorama:', error));
          }
        })
        .catch((error) => console.error('Error fetching location:', error));
    }
  }, [session]);

  // Conditional rendering of the UI based on session state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    signIn();
    return <p>Redirecting to sign in...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome, {session.user.email}</h2>
      <Map onLocationSelect={(coords) => setLocation(coords)} />
      {location && (
        <div className="mt-4">
          <p>Selected Location:</p>
          <pre>{JSON.stringify(location, null, 2)}</pre>
        </div>
      )}
      {panoramaUrl && (
        <div className="mt-4">
          <p>Street View Image:</p>
          <img src={panoramaUrl} alt="Street View" />
        </div>
      )}
    </div>
  );
}
