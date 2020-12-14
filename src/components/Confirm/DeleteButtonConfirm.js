import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { Confirm } from './Confirm';

export const DeleteButtonConfirm = ({ ...options }) => {
  const dispatch = useDispatch();
  const { Icon, headerTitle, content, okeBtn, cancelBtn } = options;

  const optionProps = {
    Icon,
    headerTitle,
    content,
    okeBtn: {
      ...okeBtn,
      onClick: () => dispatch(okeBtn.onClick()),
    },
    cancelBtn,
  };

  const onClickDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => <Confirm onClose={onClose} {...optionProps} />,
    });
  };
  return (
    <React.Fragment>
      <Button color="danger" onClick={onClickDelete}>
        <i className="uil-trash-alt"></i>
      </Button>
    </React.Fragment>
  );
};

export default DeleteButtonConfirm;
