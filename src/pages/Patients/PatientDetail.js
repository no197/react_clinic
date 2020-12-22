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
import { clearPatientDetail, getPatientDetail, updatePatient } from '../../redux/patients/actions';
import Loading from '../../components/Loading/Loading';
import PreLoaderWidget from '../../components/Loader';
import { useTranslation } from 'react-i18next';
const PatientDetail = ({ patient, ...props }) => {
  const { id } = props.match.params;
  const { clearPatientDetail, getPatientDetail, updatePatient } = props;
  const [errors, setErrors] = useState([]);
  const [t, i18n] = useTranslation();
  useEffect(() => {
    getPatientDetail(id);

    return () => {
      clearPatientDetail();
    };
  }, [clearPatientDetail, getPatientDetail, id]);

  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];

  const defaultSelect = patient ? options.find((item) => item.value === patient.gender) : null;
  const defaultDate = patient ? patient.dateOfBirth : Date.now();

  const handleSubmit = (event, values) => {
    updatePatient(values);
    console.log(values);
  };

  if (!patient) return <PreLoaderWidget />;
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: `${t('appMenu.patient')}`, path: '/app/patients' },
              {
                label: `${t('appMenu.patientDetail')}`,
                path: '/app/patients/new',
                active: true,
              },
            ]}
            title={`${t('patient.patientDetail')}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('patient.patientDetail')}</h4>
              <p className="sub-header">{t('patient.patientDetail')}</p>
              <Col md="8">
                <AvForm
                  onInvalidSubmit={(event, errors, values) => setErrors(errors)}
                  onValidSubmit={handleSubmit}
                  model={patient}>
                  <AvField name="patientId" hidden />
                  <AvField
                    name="fullName"
                    label={t('patient.patientName')}
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
  patient: state.Patient.patient,
});
const mapDispatchToProps = (dispatch) => ({
  getPatientDetail: (id) => dispatch(getPatientDetail(id)),
  updatePatient: (patient) => dispatch(updatePatient(patient)),
  clearPatientDetail: () => dispatch(clearPatientDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
