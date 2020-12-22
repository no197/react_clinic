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
import { useTranslation } from 'react-i18next';
const EmployeeDetail = ({ employee, ...props }) => {
  const { id } = props.match.params;
  const { clearEmployeeDetail, getEmployeeDetail, updateEmployee } = props;
  const [errors, setErrors] = useState([]);
  const [t] = useTranslation();
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

  const positions = [
    { value: 'Nhân viên', label: 'Nhân viên' },
    { value: 'Bác sĩ', label: 'Bác sĩ' },
    { value: 'Dược sĩ', label: 'Dược sĩ' },
    { value: 'Quản lý', label: 'Quản lý' },
  ];

  const defaultSelect = employee ? options.find((item) => item.value === employee.gender) : null;
  const defaultPos = employee ? positions.find((item) => item.value === employee.position) : null;
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
              { label: `${t('appMenu.employee')}`, path: '/app/employees' },
              {
                label: `${t('employee.EmployeeDetail')}`,
                path: `/app/employees/${id}`,
                active: true,
              },
            ]}
            title={`${t('employee.EmployeeDetail')}`}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('employee.EmployeeDetail')} </h4>
              <p className="sub-header">{t('employee.EmployeeDetail')}</p>
              <Col md="8">
                <AvForm
                  onInvalidSubmit={(event, errors, values) => setErrors(errors)}
                  onValidSubmit={handleSubmit}
                  model={employee}>
                  <AvGroup>
                    <AvInput name="employeeId" hidden />
                  </AvGroup>

                  <AvField name="employeeId" hidden />

                  <AvField
                    name="fullName"
                    label={t('employee.EmployeeName')}
                    placeholder={t('employee.EmployeeName')}
                    validate={{
                      required: { value: true, errorMessage: `${t('employee.EmployeeNameRequired')}` },
                      minLength: { value: 4, errorMessage: `${t('employee.EmployeeNameMinLength')}` },
                      maxLength: { value: 30, errorMessage: `${t('employee.EmployeeNameMaxLength')}` },
                    }}
                  />

                  <AVSelect
                    name="gender"
                    label={t('employee.EmployeeGender')}
                    placeholder={t('employee.EmployeeGenderSelect')}
                    defaultValue={defaultSelect}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={`${t('employee.EmployeeGenderRequired')}`}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={defaultDate}
                    error={errors.indexOf('dateOfBirth') !== -1}
                    label={t('employee.EmployeeDOB')}
                    options={{
                      dateFormat: 'd-m-Y', // format ngày giờ
                      allowInput: true,
                    }}
                    validate={{
                      dateRange: {
                        start: { value: -110, units: 'years' },
                        end: { value: 0, units: 'days' },
                        errorMessage: `${t('employee.EmployeeDOBError')}`,
                      },
                    }}
                  />

                  <AvGroup>
                    <Label for="address">{t('employee.EmployeeAddress')}</Label>
                    <AvInput placeholder={t('employee.EmployeeAddress')} name="address" required />
                    <AvFeedback>{t('employee.EmployeeAddressRequired')}</AvFeedback>
                  </AvGroup>

                  <AVSelect
                    name="position"
                    label={t('employee.EmployeePosition')}
                    placeholder={t('employee.EmployeePosition')}
                    defaultValue={defaultPos}
                    error={errors.indexOf('position') !== -1}
                    options={positions}
                    errorMessage={t('employee.EmplyeePositionRequired')}
                  />

                  <Button color="primary" type="submit">
                    {t('general.submit')}
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
