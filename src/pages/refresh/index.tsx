import React, { useEffect } from 'react';
import { useNavigate } from 'PackageNameByCore';

const Refresh: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);

  return <React.Fragment />;
};

export default Refresh;
