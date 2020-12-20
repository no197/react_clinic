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
import { useTranslation } from 'react-i18next';
const NewEmployee = (props) => {
  const [errors, setErrors] = useState([]);
  const [t, i18n] = useTranslation();
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
              { label: `${t('appMenu.employee')}`, path: '/app/employees' },
              {
                label: `${t('appMenu.addEmployee')}`,
                path: '/app/employees/new',
                active: true,
              },
            ]}
            title={`${t('employee.newEmployee')}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('employee.newEmployee')}</h4>
              <p className="sub-header">{t('employee.newEmployeeTitle')}</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
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
                    // defaultValue={{ value: 'Nam', label: 'Nam' }}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={`${t('employee.EmployeeGenderRequired')}`}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={new Date()}
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

                  <AvGroup>
                    <Label for="phoneNumber">{t('employee.EmployeePhone')}</Label>
                    <AvInput placeholder={t('employee.EmployeePhone')} name="phoneNumber" required />
                    <AvFeedback>{t('employee.EmployeePhoneRequired')}</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <Label for="position">{t('employee.EmployeePosition')}</Label>
                    <AvInput placeholder={t('employee.EmployeePosition')} name="position" required />
                    <AvFeedback>{t('employee.EmplyeePositionRequired')}</AvFeedback>
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
