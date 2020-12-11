import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AVDatePicker from '../Form/AVDatePicker';
import moment from 'moment';

class ButtonAppointmentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      errors: [],
    };

    this.toggle = this.toggle.bind(this);
    this.openModalWithSize = this.openModalWithSize.bind(this);
    this.openModalWithClass = this.openModalWithClass.bind(this);
  }

  /**
   * Show/hide the modal
   */
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  /**
   * Opens  modal with size
   */
  openModalWithSize = (size) => {
    this.setState({ size: size, className: null });
    this.toggle();
  };

  /**
   * Opens modal with custom class
   */
  openModalWithClass = (className) => {
    this.setState({ className: className, size: null });
    this.toggle();
  };

  handleSubmit = (event, values) => {
    console.log(values);
    this.toggle();
  };
  render() {
    const { patientId, fullName } = this.props.patient;
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Button className="mr-2" color="primary" onClick={() => this.openModalWithSize('md')}>
          <i className="uil-plus"></i>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.className} size={this.state.size}>
          <ModalHeader toggle={this.toggle}>Thêm đăng kí khám bệnh</ModalHeader>
          <AvForm
            onInvalidSubmit={(event, errors, values) => this.setState({ errors })}
            onValidSubmit={this.handleSubmit}>
            <ModalBody>
              <AvGroup>
                <AvInput name="patientId" value={patientId} hidden />
              </AvGroup>

              <AvGroup>
                <AvInput name="status" value="Đang chờ khám" hidden />
              </AvGroup>

              <AvGroup>
                <AvInput name="patientName" value={fullName} readOnly />
              </AvGroup>
              <AVDatePicker
                name="dateOfAppointment"
                defaultValue={moment().format('YYYY-MM-DD HH:mm:ss')}
                error={errors.indexOf('dateOfAppointment') !== -1}
                label="Ngày đăng ký"
                options={{
                  minDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                  maxDate: moment().add(15, 'days'),
                  dateFormat: 'd-m-Y H:i', // format ngày giờ
                  allowInput: true,
                  enableTime: true,
                }}
                validate={{
                  dateRange: {
                    start: { value: 0, units: 'minutes' },
                    end: { value: 15, units: 'days' },
                    errorMessage: 'Bạn chỉ có thể đặt lịch hẹn trước trong vòng 15 ngày tiếp theo',
                  },
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Thêm đăng ký
              </Button>
              <Button color="secondary" className="ml-1" onClick={this.toggle}>
                Hủy bỏ
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ButtonAppointmentModal;
