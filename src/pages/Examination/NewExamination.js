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

const NewExamination = (props) => {
  //Get appointmentId from params
  const { appointId } = props.match.params;

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
      Thêm phiếu khám bệnh cho bệnh nhân {appointment.patientName}
      {/* BeadCrumb */}
      <Row className="page-title">
        <Col>
          <PageTitle
            breadCrumbItems={[
              {
                label: 'Khám bệnh',
                path: '/app/examinations',
              },
              {
                label: 'Thêm phiếu khám bệnh',
                active: true,
              },
            ]}
            title={'Thêm phiếu khám bệnh'}
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
                <h4 className="header-title mt-0 mb-4">Phiếu khám bệnh của bệnh nhân</h4>
                <p className="sub-header">Vui lòng nhập các thông tin của bệnh nhân vào các ô bên dưới</p>
                <Col md="8">
                  <AvInput name="appointmentId" value={appointId} hidden />

                  <AvGroup>
                    <Label for="patientName">Tên bệnh nhân</Label>
                    <AvInput name="patientName" value={appointment.patientName} readOnly />
                  </AvGroup>

                  <AvField
                    name="symptom"
                    label="Triệu chứng"
                    placeholder="Triệu chứng"
                    validate={{
                      required: { value: true, errorMessage: 'Triệu chứng là bắt buộc' },
                      minLength: { value: 6, errorMessage: 'Triệu chứng phải có ít nhất 6 ký tự' },
                      maxLength: { value: 200, errorMessage: 'Triệu chứng không thể dài quá 200 ký tự' },
                    }}
                  />

                  <AvGroup>
                    <Label for="diagnose">Chẩn đoán</Label>
                    <AvInput placeholder="Chuẩn đoán" name="diagnose" required />
                    <AvFeedback>Chẩn đoán là bắt buộc</AvFeedback>
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
                <h4 className="header-title mt-0 mb-4">Chi tiết đơn thuốc</h4>

                <Button className="mr-2 mb-4" color="secondary" type="button" onClick={toggle}>
                  <i className="uil-plus"></i> Thêm chi tiết
                </Button>

                <Table className="mb-5" striped bordered hover>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên thuốc</th>
                      <th>Số lượng</th>
                      <th>Cách sử dụng</th>
                      <th>Hành động</th>
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
                          Chưa có chi tiết đơn thuốc nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div className="float-right">
                  <Button color="primary" type="submit">
                    Thêm phiếu khám
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
