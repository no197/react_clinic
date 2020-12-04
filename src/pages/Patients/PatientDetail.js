import React, { useState } from 'react';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';

import PageTitle from '../../components/PageTitle';

const PatientDetail = (props) => {
  const { id } = props.match.params;
  const [errors, setErrors] = useState([]);

  const fakePatient = {
    patientId: 1,
    fullName: 'Hồ Thị Cẩm Hoài',
    gender: 'Nữ',
    dateOfBirth: '2005-12-15T00:00:00',
    address: '873 Lê Hồng Phong, Q5, TpHCM',
    phoneNumber: '0903655711',
  };
  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

  const defaultSelect = options.find((item) => item.value === fakePatient.gender);

  const handleSubmit = (event, values) => {
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
                label: 'Chi tiết bệnh nhân',
                path: `/app/patients/${id}`,
                active: true,
              },
            ]}
            title={'Chi tiết bệnh nhân'}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Bootstrap Validation - Normal</h4>
              <p className="sub-header">
                Provide valuable, actionable feedback to your users with HTML5 form validation–available in all our
                supported browsers.
              </p>
              <Col md="8">
                <AvForm
                  onInvalidSubmit={(event, errors, values) => setErrors(errors)}
                  onValidSubmit={handleSubmit}
                  model={fakePatient}>
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
                    defaultValue={defaultSelect}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={'Giới tính bệnh nhân là bắt buộc'}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={fakePatient.dateOfBirth}
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

                  <AvGroup>
                    <Label for="phoneNumber">Số điện thoại</Label>
                    <AvInput placeholder="Số điện thoại" name="phoneNumber" required />
                    <AvFeedback>Số điện thoại của bệnh nhân là bắt buộc</AvFeedback>
                  </AvGroup>

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

export default PatientDetail;
