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

const PatientDetail = ({ patient, ...props }) => {
  const { id } = props.match.params;
  const { clearPatientDetail, getPatientDetail, updatePatient } = props;
  const [errors, setErrors] = useState([]);

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

  if (!patient) return <div></div>;
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
                  model={patient}>
                  <AvGroup>
                    <AvInput name="patientId" hidden />
                  </AvGroup>

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
                    <AvFeedback>Địa chỉ của bệnh nhân là bắt buộc</AvFeedback>
                  </AvGroup>

                  <AvField
                    name="phoneNumber"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    validate={{
                      required: { value: true, errorMessage: 'Số điện thoại của bệnh nhân là bắt buộc' },
                      pattern: {
                        value: '(09|03|07|08|05)+([0-9]{8})',
                        errorMessage: 'Số điện thoại không phải là số điện thoại Việt Nam hợp lệ',
                      },
                      minLength: { value: 10, errorMessage: 'Số điện thoại chỉ phải bao gồm 10 chữ số' },
                      maxLength: { value: 10, errorMessage: 'Số điện thoại chỉ có thể dài tối đa 10 chữ số' },
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
