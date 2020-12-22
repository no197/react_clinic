import React, { useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Card, CardBody, Button, Container } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { getExaminationDetail } from '../../redux/examinations/actions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const ExaminationDetail = (props) => {
  const { examinationId } = props.match.params;
  const examinationDetail = useSelector((state) => state.Examinations.examination);
  const loading = useSelector((state) => state.Examinations.loading);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  useEffect(() => {
    dispatch(getExaminationDetail(examinationId));
    return () => {};
  }, [dispatch, examinationId]);

  if (loading || !examinationDetail) {
    return <Loading />;
  }

  const { patient, prescriptionDetails } = examinationDetail;
  return (
    <React.Fragment>
      <Row className="page-title d-print-none">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: `${t('appMenu.examination')}`, path: '/app/examinations' },
              { label: `${t('examination.detail')}`, path: '/app/examinations', active: true },
            ]}
            title={`${t('examination.detail')}`}
          />
        </Col>
      </Row>
      <Container className="px-5">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="clearfix">
                  <div className="float-sm-left">
                    <img src={logo} alt="" height="48" />
                    <h4 className="m-0 d-inline align-middle">NHÂN VIỆT MEDICAL</h4>
                  </div>
                  <div className="float-sm-right">
                    <address className="pl-2 mt-2">
                      <span className="font-weight-bold"> {t('examination.address')}: </span> 189 Lê Văn Việt, Hiệp Phú,
                      Quận 9,
                      <br />
                      Thành phố Hồ Chí Minh
                      <br />
                      <span className="font-weight-bold"> {t('examination.phone')}: </span> 028 6280 8656
                      <br />
                      <span className="font-weight-bold"> Email: </span> pknhanviet@gmail.com
                    </address>
                  </div>
                </div>
                <hr />

                <Row className="mt-4">
                  <Col>
                    <h2 className="text-uppercase font-weight-bold text-center">{t('appMenu.examinationList')}</h2>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={5} className="offset-md-1">
                    <h6 className="font-weight-normal">
                      {t('patient.patientName')}: <b>{patient.fullName}</b>
                    </h6>
                    <h6 className="font-weight-normal">
                      {t('patient.patientAddress')}: <b>{patient.address}</b>
                    </h6>
                    <h6 className="font-weight-normal">
                      {t('patient.patientPhone')}: <b>{patient.phoneNumber}</b>{' '}
                    </h6>
                    <h6 className="font-weight-normal">
                      {t('examination.symptom')}: <b>{examinationDetail.symptom}</b>
                    </h6>
                    <h6 className="font-weight-normal">
                      {t('examination.diagnose')}: {examinationDetail.diagnose}
                    </h6>
                  </Col>

                  <Col md={4}>
                    <div className="offset-md-2">
                      {/* text-md-right */}
                      <h6 className="font-weight-normal">
                        {t('examination.examinationId')}: <b>{examinationDetail.examinationId}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        {t('examination.employeeName')}: <b>{examinationDetail.employeeName}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        {t('examination.createdDate')}:{' '}
                        <b>{moment(new Date(examinationDetail.createdDate)).format('DD/MM/YYYY')}</b>
                      </h6>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <h5 className="text-uppercase text-center">{t('examination.medicine')}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="table-responsive">
                      <table className="table mt-4 table-centered table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>STT</th>
                            <th>{t('medicine.MedicineName')}</th>
                            <th>{t('medicine.quantity')}</th>
                            {/* <th>Đơn vị</th> */}
                            <th>{t('examination.using')}</th>
                          </tr>
                        </thead>
                        <tbody className="table-striped">
                          {prescriptionDetails.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                  <h5 className="font-size-16 mt-0 mb-2">{item.medicineName}</h5>
                                  <p className="text-muted mb-0">{item.unit}</p>
                                </td>

                                <td>{item.quantity}</td>
                                <td>{item.instruction}</td>
                              </tr>
                            );
                          })}
                          {!prescriptionDetails.length && (
                            <tr>
                              <td colSpan="5" className="text-center">
                                {t('examination.nonMedical')}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Row className=" mt-4">
                  <Col sm={6} className="col-6 text-center">
                    <p className="font-weight-bold m-0 font-size-15">{t('appMenu.patient')}</p>
                    <p className="pb-4">{t('examination.sign')}</p>
                  </Col>

                  <Col sm={6} className="col-6 text-center">
                    <p className="m-0">
                      {t('examination.HCMcity')}, {t('examination.date')}{' '}
                      {moment(examinationDetail.createdDate).format('DD')} {t('examination.month')}{' '}
                      {moment(examinationDetail.createdDate).format('MM')} {t('examination.year')}{' '}
                      {moment(examinationDetail.createdDate).format('YYYY')}
                    </p>
                    <p className="font-weight-bold m-0">{t('examination.creator')} </p>
                    <p className="pb-4">{t('examination.sign')}</p>
                  </Col>
                </Row>

                <div className="mt-5 mb-1">
                  <div className="text-right d-print-none">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        window.print();
                      }}>
                      <i className="uil uil-print mr-1"></i>
                      {t('examination.print')}
                    </Button>
                    <Link to="/app/examinations">
                      <Button color="light" className=" ml-1">
                        {t('examination.back')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ExaminationDetail;
