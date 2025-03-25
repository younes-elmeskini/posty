'use client'
import { useEffect, useState } from 'react'
export default function Home() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState("")

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Users:</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.userId}>{user.userName} - {user.email}</li>
        ))}
      </ul>
      <button 
      >login</button>
    </main>
  )
}