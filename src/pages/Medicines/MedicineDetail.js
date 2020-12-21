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
import { useTranslation } from 'react-i18next';
const MedicineDetail = ({ medicine, ...props }) => {
  const { id } = props.match.params;
  const { clearMedicineDetail, getMedicineDetail, updateMedicine } = props;
  const [errors, setErrors] = useState([]);
  const [t, i18n] = useTranslation();
  useEffect(() => {
    getMedicineDetail(id);

    return () => {
      clearMedicineDetail();
    };
  }, [clearMedicineDetail, getMedicineDetail, id]);

  const options = [
    { value: `${t('medicine.pill')}`, label: `${t('medicine.pill')}` },
    { value: `${t('medicine.pack')}`, label: `${t('medicine.pack')}` },
    { value: `${t('medicine.pipe')}`, label: `${t('medicine.pipe')}` },
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
              { label: `${t('appMenu.medicine')}`, path: '/app/medicines' },
              {
                label: `${t('medicine.MedicineDetail')}`,
                path: `/app/medicines/${id}`,
                active: true,
              },
            ]}
            title={ `${t('medicine.MedicineDetail')}`}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">{t('medicine.MedicineDetail')}</h4>
              <p className="sub-header">
              {t('medicine.MedicineDetail')}
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
                    label={t('medicine.MedicineName')}
                    placeholder={t('medicine.MedicineName')}
                    validate={{
                      required: { value: true, errorMessage: `${t('medicine.MedicineRequired')}` },
                      minLength: { value: 4, errorMessage: `${t('medicine.MedicineNameMinLength')}` },
                      maxLength: { value: 30, errorMessage: `${t('medicine.MedicineNameMaxLength')}` },
                    }}
                  />

                  <AVSelect
                    name="unit"
                    label={t('medicine.unit')}
                    placeholder={t('medicine.selectUnit')}
                    defaultValue={defaultSelect}
                    error={errors.indexOf('unit') !== -1}
                    options={options}
                    errorMessage={`${t('medicine.unitRequired')}`}
                  />

                  

                  <AvGroup>
                    <Label for="price">{t('medicine.price')}</Label>
                    <AvInput placeholder={t('medicine.price')} name="price" required />
                    <AvFeedback>{t('medicine.priceRequired')}</AvFeedback>
                  </AvGroup>

              
                  <AvGroup>
                    <Label for="quantity">{t('medicine.quantity')}</Label>
                    <AvInput placeholder={t('medicine.quantity')} name="quantity" required />
                    <AvFeedback>{t('medicine.quantityRequired')}</AvFeedback>
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
