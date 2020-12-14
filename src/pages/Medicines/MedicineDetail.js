import React, { useEffect, useState } from 'react';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';

import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';
import { clearEmployeeDetail, getEmployeeDetail, updateEmployee } from '../../redux/Employees/actions';
import Loading from '../../components/Loading/Loading';

const EmployeeDetail = ({ employee, ...props }) => {
  const { id } = props.match.params;
  const { clearEmployeeDetail, getEmployeeDetail, updateEmployee } = props;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getEmployeeDetail(id);

    return () => {
      clearEmployeeDetail();
    };
  }, [clearEmployeeDetail, getEmployeeDetail, id]);

  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

  const defaultSelect = employee ? options.find((item) => item.value === employee.gender) : null;
  const defaultDate = employee ? employee.dateOfBirth : Date.now();

  const handleSubmit = (event, values) => {
    updateEmployee(values);
    console.log(values);
  };

  if (!employee) return <Loading />;
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Nhân viên', path: '/app/employees' },
              {
                label: 'Chi tiết Nhân viên',
                path: `/app/employees/${id}`,
                active: true,
              },
            ]}
            title={'Chi tiết Nhân viên'}
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
                  model={employee}>
                  <AvGroup>
                    <AvInput name="employeeId" hidden />
                  </AvGroup>

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
                    defaultValue={defaultSelect}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={'Giới tính Nhân viên là bắt buộc'}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={defaultDate}
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

                  <AvField
                    name="phoneNumber"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    validate={{
                      required: { value: true, errorMessage: 'Số điện thoại của Nhân viên là bắt buộc' },
                      pattern: {
                        value: '(09|03|07|08|05)+([0-9]{8})',
                        errorMessage: 'Số điện thoại không phải là số điện thoại Việt Nam hợp lệ',
                      },
                      minLength: { value: 10, errorMessage: 'Số điện thoại chỉ phải bao gồm 10 chữ số' },
                      maxLength: { value: 10, errorMessage: 'Số điện thoại chỉ có thể dài tối đa 10 chữ số' },
                    }}
                  />
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
  employee: state.Employees.employee,
});
const mapDispatchToProps = (dispatch) => ({
  getEmployeeDetail: (id) => dispatch(getEmployeeDetail(id)),
  updateEmployee: (employee) => dispatch(updateEmployee(employee)),
  clearEmployeeDetail: () => dispatch(clearEmployeeDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
