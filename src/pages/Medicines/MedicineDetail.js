import React, { useEffect, useState } from 'react';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';

import AVSelect from '../../components/Form/AVSelect';

import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';

import Loading from '../../components/Loading/Loading';
import { clearMedicineDetail, getMedicineDetail, updateMedicine } from '../../redux/Medicines/actions';

const MedicineDetail = ({ medicine, ...props }) => {
  const { id } = props.match.params;
  const { clearMedicineDetail, getMedicineDetail, updateMedicine } = props;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getMedicineDetail(id);

    return () => {
      clearMedicineDetail();
    };
  }, [clearMedicineDetail, getMedicineDetail, id]);

  const options = [
    { value: 'viên', label: 'viên' },
    { value: 'bịch', label: 'bịch' },
    { value: 'ống', label: 'ống' },
  ];

  const defaultSelect = medicine ? options.find((item) => item.value === medicine.unit) : null;


  const handleSubmit = (event, values) => {
    updateMedicine(values);
    console.log(values);
  };

  if (!medicine) return <Loading />;
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Thuốc', path: '/app/medicines' },
              {
                label: 'Chi tiết Thuốc',
                path: `/app/medicines/${id}`,
                active: true,
              },
            ]}
            title={'Chi tiết Thuốc'}
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
                  model={medicine}>
                  <AvGroup>
                    <AvInput name="medicineId" hidden />
                  </AvGroup>

                  <AvField
                    name="medicineName"
                    label="Tên Thuốc"
                    placeholder="Tên Thuốc"
                    validate={{
                      required: { value: true, errorMessage: 'Tên Thuốc là bắt buộc' },
                      minLength: { value: 4, errorMessage: 'Tên Thuốc phải có ít nhất 6 ký tự' },
                      maxLength: { value: 30, errorMessage: 'Tên Thuốc không thể dài quá 30 ký tự' },
                    }}
                  />

                  <AVSelect
                    name="unit"
                    label="Đơn vị"
                    placeholder="Chọn Đơn vị Thuốc"
                    defaultValue={defaultSelect}
                    error={errors.indexOf('unit') !== -1}
                    options={options}
                    errorMessage={'Đơn vị Thuốc là bắt buộc'}
                  />

                  

                  <AvGroup>
                    <Label for="price">Địa chỉ</Label>
                    <AvInput placeholder="Địa chỉ" name="price" required />
                    <AvFeedback>Địa chỉ của Thuốc là bắt buộc</AvFeedback>
                  </AvGroup>

              
                  <AvGroup>
                    <Label for="quantity">Chức vụ</Label>
                    <AvInput placeholder="Chức vụ" name="quantity" required />
                    <AvFeedback>Chức vụ của Thuốc là bắt buộc</AvFeedback>
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
  medicine: state.Medicine.medicine,
});
const mapDispatchToProps = (dispatch) => ({
  getMedicineDetail: (id) => dispatch(getMedicineDetail(id)),
  updateMedicine: (medicine) => dispatch(updateMedicine(medicine)),
  clearMedicineDetail: () => dispatch(clearMedicineDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicineDetail);
