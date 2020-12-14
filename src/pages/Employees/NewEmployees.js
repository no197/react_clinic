import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import { createEmployees } from '../../redux/Employees/actions';
import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';

const NewEmployee = (props) => {
  const [errors, setErrors] = useState([]);

  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

  const handleSubmit = (event, values) => {
    props.createEmployees(values);
    console.log(values);
  };

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Nhân viên', path: '/app/employees' },
              {
                label: 'Thêm Nhân viên',
                path: '/app/employees/new',
                active: true,
              },
            ]}
            title={'Thêm Nhân viên'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Thêm Nhân viên mới</h4>
              <p className="sub-header">Vui lòng nhập các thông tin của Nhân viên vào các ô bên dưới</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
                  <AvField
                    name="fullName"
                    label="Tên Nhân viên"
                    placeholder="Tên Nhân viên"
                    validate={{
                      required: { value: true, errorMessage: 'Tên Nhân viên là bắt buộc' },
                      minLength: { value: 4, errorMessage: 'Tên Nhân viên phải có ít nhất 6 ký tự' },
                      maxLength: { value: 30, errorMessage: 'Tên Nhân viên không thể dài quá 30 ký tự' },
                    }}
                  />

                  <AVSelect
                    name="gender"
                    label="Giới tính"
                    placeholder="Chọn giới tính Nhân viên"
                    // defaultValue={{ value: 'Nam', label: 'Nam' }}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={'Giới tính Nhân viên là bắt buộc'}
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
                    <AvFeedback>Địa chỉ của Nhân viên là bắt buộc</AvFeedback>
                  </AvGroup>

                  <AvGroup>
                    <Label for="phoneNumber">Số điện thoại</Label>
                    <AvInput placeholder="Số điện thoại" name="phoneNumber" required />
                    <AvFeedback>Số điện thoại của Nhân viên là bắt buộc</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <Label for="position">Chức vụ</Label>
                    <AvInput placeholder="Chức vụ" name="position" required />
                    <AvFeedback>Chức vụ của Nhân viên là bắt buộc</AvFeedback>
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
const mapStateToProps = (state) => ({
  employees: state.Employees.employees,
});
const mapDispatchToProps = (dispatch) => ({
 createEmployees: (params) => dispatch(createEmployees(params))
});
export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee);
