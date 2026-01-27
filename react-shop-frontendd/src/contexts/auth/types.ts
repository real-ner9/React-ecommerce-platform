import type { CartItem } from '../cart/types';import type { Favorite } from '../favorite/types';
export type User = {
  id: number
  email: string
  name?: string
  lastLoginAt: string | null
  isEmailConfirmed: boolean
  cart: CartItem[]
  favorite: Favorite[]
  role: 'User' | 'Admin'
}

export type RegisterPayload = LoginPayload & {
  name?: string
}

export type RegisterResponse = {
  message?: string
}

export type Register = (payload: RegisterPayload) => Promise<RegisterResponse>

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = string

export type Login = (payload: LoginPayload) => Promise<LoginResponse>

export type SendConfirmationLinkResponse = {
  message?: string
}

export type SendConfirmationLink = (token: string) => Promise<SendConfirmationLinkResponse>

export type Logout = () => void

export type GetUser = (id: number) => Promise<User>

export type AuthContextProps = {
  login: Login
  register: Register
  sendConfirmationLink: SendConfirmationLink
  resendConfirmationLink: () => void
  user: User
  logout: Logout
  getUser: GetUser
  setUser: (value: User) => void
  isUserExist: boolean
  isLoading: boolean
};
