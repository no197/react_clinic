import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { Confirm } from './Confirm';

export const PrintButtonConfirm = ({ ...options }) => {
  const dispatch = useDispatch();
  const { Icon, headerTitle, content, okeBtn, cancelBtn, type = 'danger' } = options;

  const optionProps = {
    Icon,
    headerTitle,
    content,
    okeBtn: {
      ...okeBtn,
      onClick: () => {
        dispatch(okeBtn.onClick());
        window.print();
      },
    },
    cancelBtn,
    type,
  };

  const onClickPrint = () => {
    confirmAlert({
      customUI: ({ onClose }) => <Confirm onClose={onClose} {...optionProps} />,
    });
  };
  return (
    <React.Fragment>
      <Button color="primary" onClick={onClickPrint}>
        <i className="uil uil-print mr-1"></i>In hóa đơn
      </Button>
    </React.Fragment>
  );
};

export default PrintButtonConfirm;
