import React, { useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { Confirm } from './Confirm';

export const DeleteButtonConfirm = ({ ...options }) => {
  const lng = useSelector((state) => state.i18next.lng);
  const lngRef = useRef(lng);
  const dispatch = useDispatch();
  const { Icon, headerTitle, content, okeBtn, cancelBtn } = options;

  console.log(lng, lngRef.current);
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
