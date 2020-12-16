import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React, { useEffect, useState } from 'react';

import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AVDatePicker from '../../components/Form/AVDatePicker';
import AVSelect from '../../components/Form/AVSelect';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import { createMedicines } from '../../redux/Medicines/actions';

const NewMedicine = (props) => {
  const [errors, setErrors] = useState([]);

  const options = [
    { value: 'viên', label: 'viên' },
    { value: 'ống', label: 'ống' },
    { value: 'bịch', label: 'bịch' },
  ];

  const handleSubmit = (event, values) => {
    props.createMedicines({ ...values, price: values.price * 1, quantity: values.quantity * 1 });
    console.log(values);
  };

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Thuốc', path: '/app/medicines' },
              {
                label: 'Thêm Thuốc',
                path: '/app/medicines/new',
                active: true,
              },
            ]}
            title={'Thêm Thuốc'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Thêm Thuốc mới</h4>
              <p className="sub-header">Vui lòng nhập các thông tin của Thuốc vào các ô bên dưới</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
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
                    label="Đơn Vị"
                    placeholder="Chọn Đơn Vị Thuốc"
                    // defaultValue={{ value: 'Nam', label: 'Nam' }}
                    error={errors.indexOf('unit') !== -1}
                    options={options}
                    errorMessage={'Đơn Vị Thuốc là bắt buộc'}
                  />

                  <AvGroup>
                    <Label for="price">Đơn Giá</Label>
                    <AvInput placeholder="Đơn giá" name="price" required />
                    <AvFeedback>Đơn giá của Thuốc là bắt buộc</AvFeedback>
                  </AvGroup>

                  <AvGroup>
                    <Label for="quantity">Số lượng</Label>
                    <AvInput placeholder="Số lượng" name="quantity" required />
                    <AvFeedback>Số lượng của Thuốc là bắt buộc</AvFeedback>
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
  medicines: state.Medicine.medicines,
});
const mapDispatchToProps = (dispatch) => ({
  createMedicines: (params) => dispatch(createMedicines(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewMedicine);
