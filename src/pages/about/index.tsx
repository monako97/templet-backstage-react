import React from 'react';
import localizable from 'app:locales';
import { useOutlet } from '@moneko/react';
import { Typography } from 'antd';

const About = () => {
  const { t } = localizable;
  const outlet = useOutlet();

  return (
    <>
      <Typography.Title>
        {t.about} {t.page}
      </Typography.Title>
      <Typography.Paragraph>{t['sub-page']} :</Typography.Paragraph>
      {outlet}
    </>
  );
};

export default About;
