import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

export function Dashboard() {
  const { user } = useAuth()
  return (
    <h1>{`Hello ${user?.email}`}</h1>
  )
}