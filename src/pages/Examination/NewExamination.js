import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CardBody, Col, Label, Row, Table } from 'reactstrap';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';

import Loading from '../../components/Loading/Loading';
import PrescriptionModal from '../../components/Modal/PrescriptionModal';
import PageTitle from '../../components/PageTitle';
import { createExamination, getAppointment } from '../../redux/examinations/actions';
import { useTranslation } from 'react-i18next';
const NewExamination = (props) => {
  //Get appointmentId from params
  const { appointId } = props.match.params;
  const [t, i18n] = useTranslation()
  // List prescription
  const [prescriptionDetails, setprescriptionDetails] = useState([]);

  // Selected prescription and index to update
  const [selectedPre, setSelectedPre] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Open state for modal show on or off
  const [isOpen, setIsOpen] = useState(false);

  // mapState from store redux
  const appointment = useSelector((state) => state.Examinations.appointment);
  const loading = useSelector((state) => state.Examinations.loading);
  const employeeId = useSelector((state) => state.Auth.user.employeeId);

  //Dispatch funtion
  const dispatch = useDispatch();

  // SideEffect to get appointment
  useEffect(() => {
    dispatch(getAppointment(appointId));
    return () => {};
  }, [appointId, dispatch]);

  // Handle Submit to create new examination
  const handleSubmit = (event, values) => {
    const examination = { ...values, appointmentId: appointId * 1, prescriptionDetails, employeeId };
    dispatch(createExamination(examination));
  };

  // Toggle function to show on or off modal
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  // Func add or update precription from modal submit
  const onSubmitModal = (prescription) => {
    // Quantity to int
    prescription = { ...prescription, quantity: prescription.quantity * 1 };

    // Check add duplicate
    const dupIndex = prescriptionDetails.findIndex((item) => item.medicineId === prescription.medicineId);

    let newPres = prescriptionDetails;
    //Check update in pres change medicine
    if (selectedIndex !== -1 && selectedPre) {
      //Check if update duplicate

      if (dupIndex !== -1) {
        //Remove old pre
        newPres = prescriptionDetails.filter((item, index) => index !== selectedIndex);
        newPres[dupIndex] = prescription;
      } else {
        newPres = prescriptionDetails.map((item, index) => {
          if (index !== selectedIndex) return item;
          return prescription;
        });
      }
      setprescriptionDetails(newPres);
      setSelectedPre(null);
      setSelectedIndex(-1);
      toggle();
      return;
    }

    //Add new prescription duplicate
    if (dupIndex !== -1) {
      newPres = prescriptionDetails.map((item, index) => {
        if (index !== dupIndex) return item;
        return prescription;
      });
      setprescriptionDetails(newPres);
      toggle();
      return;
    }

    //Add new prescription
    setprescriptionDetails([...newPres, prescription]);
    toggle();
  };

  // Function open modal to update
  const openModalWithSelect = (selected, index) => {
    console.log(selected);
    setSelectedPre(selected);
    setSelectedIndex(index);
    toggle();
  };

  // Display loading indicator if loading
  if (loading || !appointment) return <Loading />;

  return (
    <React.Fragment>
      {t('examination.newExam')} {appointment.patientName}
      {/* BeadCrumb */}
      <Row className="page-title">
        <Col>
          <PageTitle
            breadCrumbItems={[
              {
                label: `${t('appMenu.examination')}`,
                path: '/app/examinations',
              },
              {
                label: `${t('examination.newExam')}`,
                active: true,
              },
            ]}
            title={`${t('examination.newExam')}`}
          />
        </Col>
      </Row>
      {/* Main content  */}
      <AvForm onValidSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card>
              <CardBody>
                {/* Title  */}
                <h4 className="header-title mt-0 mb-4">{t('examination.newExamHeader')}</h4>
                <p className="sub-header">{t('examination.newExamTitle')}</p>
                <Col md="8">
                  <AvInput name="appointmentId" value={appointId} hidden />

                  <AvGroup>
                    <Label for="patientName">{t('patient.PatientName')}</Label>
                    <AvInput name="patientName" value={appointment.patientName} readOnly />
                  </AvGroup>

                  <AvField
                    name="symptom"
                    label={t('patient.symptom')}
                    placeholder={t('patient.symptom')}
                    validate={{
                      required: { value: true, errorMessage: `${t('patient.symptomRequired')}` },
                      minLength: { value: 6, errorMessage: `${t('patient.symptomMinLength')}` },
                      maxLength: { value: 200, errorMessage: `${t('patient.symptomMaxLength')}` },
                    }}
                  />

                  <AvGroup>
                    <Label for="diagnose">{t('patient.diagnose')}</Label>
                    <AvInput placeholder={t('patient.diagnose')} name="diagnose" required />
                    <AvFeedback>{t('patient.diagnoseRequired')}</AvFeedback>
                  </AvGroup>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <h4 className="header-title mt-0 mb-4">{t('examination.detail')}</h4>

                <Button className="mr-2 mb-4" color="secondary" type="button" onClick={toggle}>
                  <i className="uil-plus"></i> {t('examination.newDetail')}
                </Button>

                <Table className="mb-5" striped bordered hover>
                  <thead>
                    <tr>
                      <th>{t('examination.ExaminationNum')}</th>
                      <th>T{t('medicine.MedicineName')}</th>
                      <th>{t('medicine.quantity')}</th>
                      <th>{t('examination.using')}</th>
                      <th>{t('examination.ExaminationAction')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionDetails.map((record, index) => {
                      return (
                        <tr key={record.medicineId}>
                          <th scope="row">{index + 1}</th>
                          <td>{record.medicineName}</td>
                          <td>{record.quantity}</td>
                          <td>{record.instruction}</td>
                          <td>
                            <Button
                              color="warning"
                              className="mr-2"
                              type="button"
                              onClick={() => openModalWithSelect(record, index)}>
                              <i className="uil-pen"></i>
                            </Button>
                            <Button
                              color="danger"
                              type="button"
                              onClick={() => setprescriptionDetails((pres) => pres.filter((_, idx) => idx !== index))}>
                              <i className="uil-trash-alt"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}

                    {!prescriptionDetails.length && (
                      <tr>
                        <td colSpan="5" className="text-center">
                        {t('examination.NonDetail')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div className="float-right">
                  <Button color="primary" type="submit">
                  {t('examination.newExamination')}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </AvForm>
      <PrescriptionModal
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmitModal}
        model={selectedPre}
        onCancel={setSelectedPre}
        size="md"
      />
    </React.Fragment>
  );
};

export default NewExamination;
