import React from 'react';

import { useUserQuery } from '@hooks';

const WithUserData = ({ children }: React.PropsWithChildren) => {
  const { isSuccess } = useUserQuery();
  if (!isSuccess) {
    return null;
  }
  return children;
};

export default WithUserData;
