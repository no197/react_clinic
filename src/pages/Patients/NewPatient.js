import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React, { useState } from 'react';

import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import { createPatients } from '../../redux/patients/actions';
import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';

// TODO: 12/09/20 Reflactor code
const NewPatient = (props) => {
  const [errors, setErrors] = useState([]);

  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

  const handleSubmit = (event, values) => {
    props.createPatient(values);
    console.log(values);
  };

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Bệnh nhân', path: '/app/patients' },
              {
                label: 'Thêm bệnh nhân',
                path: '/app/patients/new',
                active: true,
              },
            ]}
            title={'Thêm bệnh nhân'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Thêm bệnh nhân mới</h4>
              <p className="sub-header">Vui lòng nhập các thông tin của bệnh nhân vào các ô bên dưới</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
                  <AvField
                    name="fullName"
                    label="Tên bệnh nhân"
                    placeholder="Tên bệnh nhân"
                    validate={{
                      required: { value: true, errorMessage: 'Tên bệnh nhân là bắt buộc' },
                      minLength: { value: 4, errorMessage: 'Tên bệnh nhân phải có ít nhất 6 ký tự' },
                      maxLength: { value: 30, errorMessage: 'Tên bệnh nhân không thể dài quá 30 ký tự' },
                    }}
                  />

                  <AVSelect
                    name="gender"
                    label="Giới tính"
                    placeholder="Chọn giới tính bệnh nhân"
                    // defaultValue={{ value: 'Nam', label: 'Nam' }}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={'Giới tính bệnh nhân là bắt buộc'}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={new Date()}
                    error={errors.indexOf('dateOfBirth') !== -1}
                    label="Ngày sinh"
                    options={{
                      dateFormat: 'd-m-Y', // format ngày giờ
                      allowInput: true,
                    }}
                    validate={{
                      dateRange: {
                        start: { value: -110, units: 'years' },
                        end: { value: 0, units: 'days' },
                        errorMessage: 'Ngày tháng năm sinh không hợp lệ',
                      },
                    }}
                  />

                  <AvGroup>
                    <Label for="address">Địa chỉ</Label>
                    <AvInput placeholder="Địa chỉ" name="address" required />
                    <AvFeedback>Địa chỉ của bệnh nhân là bắt buộc</AvFeedback>
                  </AvGroup>

                  <AvField
                    name="phoneNumber"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    validate={{
                      required: { value: true, errorMessage: 'Số điện thoại của bệnh nhân là bắt buộc' },
                      pattern: {
                        value: '(09|03|07|08|05)+([0-9]{8})',
                        errorMessage: 'Số điện thoại không phải là số điện thoại Việt Nam hợp lệ',
                      },
                      minLength: { value: 10, errorMessage: 'Số điện thoại chỉ phải bao gồm 10 chữ số' },
                      maxLength: { value: 10, errorMessage: 'Số điện thoại chỉ có thể dài tối đa 10 chữ số' },
                    }}
                  />

                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </AvForm>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  patients: state.Patient.patients,
});
const mapDispatchToProps = (dispatch) => ({
  createPatient: (params) => dispatch(createPatients(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPatient);
