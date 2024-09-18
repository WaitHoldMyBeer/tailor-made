// app/page.js
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        } else {
          console.error(result.error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Tailor Made</h2>
      {data ? (
        <div>
          <p>Message from Cloud Function and MongoDB:</p>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
