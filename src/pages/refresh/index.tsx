import React, { useEffect } from 'react';
import { useNavigate } from '@moneko/react';

const Refresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return <>Refresh</>;
};

export default Refresh;
