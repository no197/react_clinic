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
import { useTranslation } from 'react-i18next';
const NewMedicine = (props) => {
  const [errors, setErrors] = useState([]);
  const [t, i18n] = useTranslation();
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
              { label: `${t('appMenu.medicine')}`, path: '/app/medicines' },
              {
                label: `${t('medicine.MedicineDetail')}`,
                path: `/app/medicines/new`,
                active: true,
              },
            ]}
            title={`${t('medicine.MedicineDetail')}`}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('medicine.MedicineDetail')}</h4>
              <p className="sub-header">{t('medicine.MedicineDetail')}</p>
              <Col md="8">
                <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit}>
                  <AvField
                    name="medicineName"
                    label={t('medicine.MedicineName')}
                    placeholder={t('medicine.MedicineName')}
                    validate={{
                      required: { value: true, errorMessage: `${t('medicine.MedicineNameRequired')}` },
                      minLength: { value: 4, errorMessage: `${t('medicine.MedicineNameMinLength')}` },
                      maxLength: { value: 30, errorMessage: `${t('medicine.MedicineNameMaxLength')}` },
                    }}
                  />

                  <AVSelect
                    name="unit"
                    label={t('medicine.unit')}
                    placeholder={t('medicine.selectUnit')}
                    error={errors.indexOf('unit') !== -1}
                    options={options}
                    errorMessage={`${t('medicine.unitRequired')}`}
                  />

                  <AvField
                    name="price"
                    label={t('medicine.price')}
                    placeholder={t('medicine.price')}
                    type="number"
                    validate={{
                      required: { value: true, errorMessage: t('medicine.priceRequired') },
                      min: { value: 1, errorMessage: t('medicine.minPrice') },

                      max: {
                        value: Number.MAX_SAFE_INTEGER,
                        errorMessage: t('medicine.maxPrice'),
                      },
                    }}
                  />

                  <AvField
                    name="quantity"
                    label={t('medicine.quantity')}
                    placeholder={t('medicine.quantity')}
                    type="number"
                    validate={{
                      required: { value: true, errorMessage: t('medicine.quantityRequired') },
                      min: { value: 1, errorMessage: t('medicine.minQuantity') },

                      max: {
                        value: Number.MAX_SAFE_INTEGER,
                        errorMessage: t('medicine.maxQuantity'),
                      },
                    }}
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
  medicines: state.Medicine.medicines,
});
const mapDispatchToProps = (dispatch) => ({
  createMedicines: (params) => dispatch(createMedicines(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewMedicine);
