import React, {type ReactNode, useContext, useEffect, useState, useCallback, useMemo} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import type {AuthContextProps, GetUser, Login, Register, SendConfirmationLink, User} from './types'
import {setTokenToHeaders} from '../../helpers/setTokenToHeaders'
import {requestUrl, tokenKey} from '../../env'
import {local} from '../../App'
import {useErrorHandler} from '../../hooks/useErrorHandler'
import {validateToken, getTokenUser} from '../../utils/tokenUtils'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User>({} as User);
  const [isUserExist, setIsUserExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const getUser: GetUser = useCallback((id: number) => {
    return axios
      .get<User>(`${requestUrl}/user/${id}`)
      .then(({data}) => {
        setUser(data);
      })
      .catch((error) => {
        handleError(error, 'Не удалось загрузить данные пользователя');
      });
  }, [handleError]);

  const register: Register = useCallback((payload) => {
    return axios
      .post(`${requestUrl}/auth/register`, payload)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        handleError(error);
      });
  }, [navigate, handleError]);

  const login: Login = useCallback((payload) => {
    return axios.post<string>(`${requestUrl}/auth/login`, payload)
    .then(({data}) => {
        if (!validateToken(data)) {
          throw new Error('Токен недействителен');
        }

        local.setItem(tokenKey, data);
        setTokenToHeaders(data);
        const tokenUser = getTokenUser(data);
        
        return getUser(tokenUser.id).then(() => {
          setIsUserExist(true);
          navigate('/');
        });
    })
      .catch((error) => {
        handleError(error);
        throw error;
      });
  }, [getUser, navigate, handleError]);

  const logout = useCallback(() => {
    local.removeItem(tokenKey);
    setTokenToHeaders(undefined);
    setIsUserExist(false);
    setUser({} as User);
    navigate("/login");
  }, [navigate]);

  const sendConfirmationLink: SendConfirmationLink = useCallback((token: string) => {
    return axios
      .post(`${requestUrl}/email-confirmation/confirm`, {
        token,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        handleError(error, 'Не удалось подтвердить email');
      });
  }, [navigate, handleError]);

  const resendConfirmationLink = useCallback(() => {
    return axios
      .post(`${requestUrl}/email-confirmation/resend-confirmation-link`)
      .catch((error) => {
        handleError(error, 'Не удалось отправить письмо подтверждения');
      });
  }, [handleError]);

  useEffect(() => {
    const token = local.getItem(tokenKey);

    if (!token || !validateToken(token)) {
      if (token) {
        local.removeItem(tokenKey);
        setTokenToHeaders(undefined);
      }
      setIsLoading(false);
      return;
    }

    setTokenToHeaders(token);
    const tokenUser = getTokenUser(token);

    getUser(tokenUser.id).then(() => {
      setIsUserExist(true);
    }).catch(() => {
      setIsUserExist(false);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [getUser]);

  const value = useMemo<AuthContextProps>(() => ({
    register,
    login,
    sendConfirmationLink,
    resendConfirmationLink,
    setUser,
    user,
    logout,
    getUser,
    isUserExist,
    isLoading,
  }), [
    register,
    login,
    sendConfirmationLink,
    resendConfirmationLink,
    user,
    logout,
    getUser,
    isUserExist,
    isLoading,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
