'use client';

import { useEffect, useState } from 'react';

export default function Profile() {
    const [user, setUser] = useState<{ userName: string; email: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/users/getUserData');

            if (!res.ok) {
                setError('User not authenticated');
                return;
            }

            const data = await res.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {error && <p>{error}</p>}
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.userName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}