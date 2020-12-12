import React from 'react';
import { Link } from 'react-router-dom';

const ToastifyLink = ({ closeToast, toastProps, ...props }) => {
  const { to, children } = props;
  return (
    <Link to={to} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <p>{children}</p>
    </Link>
  );
};
export default ToastifyLink;
