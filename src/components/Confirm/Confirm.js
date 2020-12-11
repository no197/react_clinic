import React from 'react';
import { Button } from 'reactstrap';

export const Confirm = ({ onClose, ...options }) => {
  const { Icon, headerTitle, content, okeBtn, cancelBtn } = options;
  return (
    <div className="react-confirm-alert-body fade show">
      <h2>
        <div className="icon-item d-flex align-items-center">
          <Icon className="icon-dual-danger mr-2"></Icon>
          <span>{headerTitle}</span>
        </div>
      </h2>
      <p>{content}</p>
      <div className="d-flex justify-content-end">
        <Button
          color={okeBtn.color || 'danger'}
          className="mr-2"
          onClick={() => {
            okeBtn.onClick();
            onClose();
          }}>
          {okeBtn.text}
        </Button>
        <Button color={cancelBtn.color || 'light'} onClick={onClose}>
          {cancelBtn.text}
        </Button>
      </div>
    </div>
  );
};
