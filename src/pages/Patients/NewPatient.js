import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React, { useEffect } from 'react';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import { createPatients } from '../../redux/patients/actions';
import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';

const NewPatient = () => {
  useEffect(() => {
    createPatients();
    return () => {};
  }, []);
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
              <h4 className="header-title mt-0 mb-1">Bootstrap Validation - Normal</h4>
              <p className="sub-header">
                Provide valuable, actionable feedback to your users with HTML5 form validation–available in all our
                supported browsers.
              </p>
              <AvForm>
                <AvField name="fullName" label="Họ tên" type="text" required />
                <AvGroup name="gender" required>
                  <p className="mb-1 mt-3 font-weight-bold">Giới tính</p>
                  <Select
                    isMulti={false}
                    options={[
                      { value: 'Nam', label: 'Nam' },
                      { value: 'Nữ', label: 'Nữ' },
                    ]}
                    className="react-select"
                    classNamePrefix="react-select"></Select>
                </AvGroup>
                <AvGroup name="dateOfBirth" required>
                  <p className="mb-1 mt-3 font-weight-bold">Ngày sinh</p>
                  <Flatpickr
                    value={new Date()}
                    onChange={(date) => {
                      console.log(date);
                    }}
                    className="form-control"
                  />
                </AvGroup>
                <AvField name="address" label="Địa Chỉ" type="text" required />
                <AvField name="phoneNumber" label="Số điện thoại" type="text" required />

                <Button color="primary" type="submit">
                  Thêm Bệnh Nhân
                </Button>
              </AvForm>
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
export default connect(mapStateToProps, { createPatients })(NewPatient);
