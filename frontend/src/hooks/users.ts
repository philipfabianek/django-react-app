import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { request } from '@utils';

const fetchUser = async () => {
  const response = await request('/api/users/data/');
  return response.data as UserQueryData;
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: fetchUser,
    staleTime: Infinity,
  });
};

export const useLoggedIn = () => {
  return useUserQuery().data?.logged_in;
};

export const useUser = () => {
  return useUserQuery().data?.user;
};

export const useRefetchUserData = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ['user-data'],
    });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    request('/api/users/signup/', {
      data: { email, password, confirmPassword },
      method: 'post',
    }).then(() => {
      navigate('/login');
    });
  };
};

export const useLogin = () => {
  const refetchUserData = useRefetchUserData();

  return ({ email, password }: { email: string; password: string }) => {
    request('/api/users/login/', {
      data: { email, password },
      method: 'post',
    }).then(() => {
      refetchUserData();
    });
  };
};

export const useLogout = () => {
  const refetchUserData = useRefetchUserData();

  return () => {
    request('/api/users/logout/', {
      method: 'post',
    }).then(() => {
      refetchUserData();
    });
  };
};
