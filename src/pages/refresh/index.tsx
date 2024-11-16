import React, { useEffect } from 'react';
import { useNavigate } from '@moneko/react';
import { Skeleton } from 'antd';

const Refresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return <Skeleton active loading title paragraph round />;
};

export default Refresh;
