import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import React, { useState } from 'react';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';

import PageTitle from '../../components/PageTitle';

const NewPatient = (props) => {
  const [errors, setErrors] = useState([]);

  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

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

export default NewPatient;
