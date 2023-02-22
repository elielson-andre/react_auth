import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"

export function Login() {
  const { register, handleSubmit } = useForm()

  const { logIn } = useAuth()

  async function handleLogIn(data) {
    await logIn(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <input {...register('email')} type="email" name="email" placeholder="E-mail" />
        <input {...register('password')} type="password" name="password" placeholder="Password" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}