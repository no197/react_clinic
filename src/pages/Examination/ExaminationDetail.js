import React, { useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Card, CardBody, Button, Container } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { getExaminationDetail } from '../../redux/examinations/actions';
import { Link } from 'react-router-dom';

const ExaminationDetail = (props) => {
  const { examinationId } = props.match.params;
  const examinationDetail = useSelector((state) => state.Examinations.examination);
  const loading = useSelector((state) => state.Examinations.loading);
  const dispatch = useDispatch();

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
              { label: 'Khám bệnh', path: '/app/examinations' },
              { label: 'Chi tiết phiếu khám bệnh', path: '/app/examinations', active: true },
            ]}
            title={'Chi tiết phiếu khám bệnh'}
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
                      <span className="font-weight-bold"> Địa chỉ: </span> 189 Lê Văn Việt, Hiệp Phú, Quận 9,
                      <br />
                      Thành phố Hồ Chí Minh
                      <br />
                      <span className="font-weight-bold"> Điện thoại: </span> 028 6280 8656
                      <br />
                      <span className="font-weight-bold"> Email: </span> pknhanviet@gmail.com
                    </address>
                  </div>
                </div>
                <hr />

                <Row className="mt-4">
                  <Col>
                    <h2 className="text-uppercase font-weight-bold text-center">Phiếu khám bệnh</h2>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={5} className="offset-md-1">
                    <h6 className="font-weight-normal">
                      Tên bệnh nhân: <b>{patient.fullName}</b>
                    </h6>
                    <h6 className="font-weight-normal">
                      Địa chỉ: <b>{patient.address}</b>
                    </h6>
                    <h6 className="font-weight-normal">
                      Số điện thoại: <b>{patient.phoneNumber}</b>{' '}
                    </h6>
                    <h6 className="font-weight-normal">
                      Triệu chứng: <b>{examinationDetail.symptom}</b>
                    </h6>
                    <h6 className="font-weight-normal">Chẩn đoán: {examinationDetail.diagnose}</h6>
                  </Col>

                  <Col md={4}>
                    <div className="offset-md-2">
                      {/* text-md-right */}
                      <h6 className="font-weight-normal">
                        Mã phiếu khám: <b>{examinationDetail.examinationId}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        Tên bác sĩ: <b>{examinationDetail.employeeName}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        Ngày khám: <b>{moment(new Date(examinationDetail.createdDate)).format('DD/MM/YYYY')}</b>
                      </h6>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <h5 className="text-uppercase text-center">Đơn thuốc</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="table-responsive">
                      <table className="table mt-4 table-centered table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>STT</th>
                            <th>Tên thuốc</th>
                            <th>Số lượng</th>
                            {/* <th>Đơn vị</th> */}
                            <th>Cách dùng</th>
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
                                Không có thuốc theo kèm
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
                    <p className="font-weight-bold m-0 font-size-15"> Bệnh nhân</p>
                    <p className="pb-4"> (Ký ghi rõ họ tên)</p>
                  </Col>

                  <Col sm={6} className="col-6 text-center">
                    <p className="m-0">
                      Thành phố Hồ Chí Minh, ngày {moment(examinationDetail.createdDate).format('DD')} tháng{' '}
                      {moment(examinationDetail.createdDate).format('MM')} năm{' '}
                      {moment(examinationDetail.createdDate).format('YYYY')}
                    </p>
                    <p className="font-weight-bold m-0">Người tạo </p>
                    <p className="pb-4">(Ký và ghi rõ họ tên)</p>
                  </Col>
                </Row>

                <div className="mt-5 mb-1">
                  <div className="text-right d-print-none">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        window.print();
                      }}>
                      <i className="uil uil-print mr-1"></i>In phiếu khám
                    </Button>
                    <Link to="/app/examinations">
                      <Button color="light" className=" ml-1">
                        Quay lại
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
