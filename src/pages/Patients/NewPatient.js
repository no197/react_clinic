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
import { useTranslation } from 'react-i18next';
// TODO: 12/09/20 Reflactor code
const NewPatient = (props) => {
  const [errors, setErrors] = useState([]);
  const [t, i18n] = useTranslation();
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
              { label:  `${t('appMenu.patient')}`, path: '/app/patients' },
              {
                label:  `${t('appMenu.addPatient')}`,
                path: '/app/patients/new',
                active: true,
              },
            ]}
            title={`${t('patient.newPatient')}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('patient.newPatient')}</h4>
              <p className="sub-header">{t('patient.newPatientTitle')}</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
                  <AvField
                    name="fullName"
                    label= {t('patient.patientName')}
                    placeholder={t('patient.addPatientName')}
                    validate={{
                      required: { value: true, errorMessage: `${t('patient.patientNameRequired')}` },
                      minLength: { value: 4, errorMessage: `${t('patient.patientNameMinLength')}` },
                      maxLength: { value: 30, errorMessage: `${t('patient.patientNameMaxLength')}` },
                    }}
                  />

                  <AVSelect
                    name="gender"
                    label={t('patient.patientGender')}
                    placeholder={t('patient.patientGenderSelect')}
                    // defaultValue={{ value: 'Nam', label: 'Nam' }}
                    error={errors.indexOf('gender') !== -1}
                    options={options}
                    errorMessage={`${t('patient.patientGenderRequired')}`}
                  />

                  <AVDatePicker
                    name="dateOfBirth"
                    defaultValue={new Date()}
                    error={errors.indexOf('dateOfBirth') !== -1}
                    label={t('patient.patientDOB')}
                    options={{
                      dateFormat: 'd-m-Y', // format ngày giờ
                      allowInput: true,
                    }}
                    validate={{
                      dateRange: {
                        start: { value: -110, units: 'years' },
                        end: { value: 0, units: 'days' },
                        errorMessage: `${t('patient.patientDOBError')}`,
                      },
                    }}
                  />

                  <AvGroup>
                    <Label for="address">{t('patient.patientAddress')}</Label>
                    <AvInput placeholder={t('patient.patientAddress')} name="address" required />
                    <AvFeedback>{t('patient.patientAddressRequired')}</AvFeedback>
                  </AvGroup>

                  <AvField
                    name="phoneNumber"
                    label={t('patient.patientPhone')}
                    placeholder={t('patient.patientPhone')}
                    validate={{
                      required: { value: true, errorMessage: `${t('patient.patientPhoneRequired')}` },
                      pattern: {
                        value: '(09|03|07|08|05)+([0-9]{8})',
                        errorMessage: `${t('patient.patientPhoneErrorMessage')}`,
                      },
                      minLength: { value: 10, errorMessage: `${t('patient.patientPhoneMinLength')}` },
                      maxLength: { value: 10, errorMessage: `${t('patient.patientPhoneMaxLength')}` },
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