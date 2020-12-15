import React, { useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Card, CardBody, Button, Container } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { getInvoiceDetail, updateInvoice } from '../../redux/invoices/actions';

import formatCash from '../../helpers/formatCash';
import * as FeatherIcon from 'react-feather';
import PrintButtonConfirm from '../../components/Confirm/PrintButtonConfirm';

const InvoiceDetail = (props) => {
  const { invoiceId } = props.match.params;
  const invoiceDetail = useSelector((state) => state.Invoices.invoice);
  const loading = useSelector((state) => state.Invoices.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoiceDetail(invoiceId));
    return () => {};
  }, [dispatch, invoiceId]);

  if (loading || !invoiceDetail) {
    return <Loading />;
  }

  const options = {
    Icon: FeatherIcon.AlertCircle, // Icon confirm
    headerTitle: 'Xác nhận in', // Header confirm
    content:
      'Việc in hóa đơn chỉ được thực hiện khi tiến hành thu tiền hóa đơn của bệnh nhân. Hãy chắc chắn bạn thật sự muốn thực hiện!',
    okeBtn: {
      text: 'Tiếp tục',
      color: 'warning',
      onClick: () => updateInvoice({ ...invoiceDetail, status: 'Đã thanh toán' }), // truyền action cần dispatch
    },
    cancelBtn: {
      text: 'Hủy bỏ',
      color: 'light',
    },
    type: 'warning',
  };

  const handleOnPrint = () => {
    window.print();
  };

  const { patient, prescriptionDetailsPrice } = invoiceDetail;
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
                    <h2 className="text-uppercase font-weight-bold text-center">Hóa đơn khám bệnh</h2>
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
                  </Col>

                  <Col md={4}>
                    <div className="offset-md-2">
                      {/* text-md-right */}
                      <h6 className="font-weight-normal">
                        Mã phiếu khám: <b>{invoiceDetail.invoiceId}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        Tên bác sĩ: <b>{invoiceDetail.employeeName}</b>
                      </h6>
                      <h6 className="font-weight-normal">
                        Ngày khám: <b>{moment(new Date(invoiceDetail.createdDate)).format('DD/MM/YYYY')}</b>
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
                            <th>Giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody className="table-striped">
                          {prescriptionDetailsPrice.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                  <h5 className="font-size-16 mt-0 mb-2">{item.medicineName}</h5>
                                  <p className="text-muted mb-0">{item.unit}</p>
                                </td>
                                <td>{item.quantity}</td>
                                <td>{formatCash(item.medicinePrice)}</td>
                                <td>{formatCash(item.totalPrice)}</td>
                              </tr>
                            );
                          })}
                          {!prescriptionDetailsPrice.length && (
                            <tr>
                              <td colSpan="5" className="text-center">
                                Không có thuốc theo kèm
                              </td>
                            </tr>
                          )}
                          {/* <tr>
                            <td colSpan="4" className="text-right">
                              Tiền thuốc:
                            </td>
                            <td>
                              <b>{formatCash(invoiceDetail.price - 100000)}</b>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan="4" className="text-right">
                              Tiền khám bệnh:
                            </td>
                            <td>
                              <b>{formatCash(100000)}</b>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan="4" className="text-right">
                              Tổng tiền:
                            </td>
                            <td>
                              <b>{formatCash(invoiceDetail.price)}</b>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Row className="my-4">
                  <Col xs={4}>
                    Phí khám: <b>{formatCash(100000)}</b>
                  </Col>
                  <Col xs={4}>
                    Tiền thuốc: <b>{formatCash(invoiceDetail.price - 100000)}</b>
                  </Col>
                  <Col xs={4}>
                    Tổng tiền: <b> {formatCash(invoiceDetail.price)}</b>
                  </Col>
                </Row>

                <Row className="pt-4">
                  <Col sm={6} className="col-6 text-center">
                    <p className="font-weight-bold m-0 font-size-15"> Bệnh nhân</p>
                    <p className="pb-4"> (Ký ghi rõ họ tên)</p>
                  </Col>

                  <Col sm={6} className="col-6 text-center">
                    <p className="m-0">
                      Thành phố Hồ Chí Minh, ngày {moment(invoiceDetail.createdDate).format('DD')} tháng{' '}
                      {moment(invoiceDetail.createdDate).format('MM')} năm{' '}
                      {moment(invoiceDetail.createdDate).format('YYYY')}
                    </p>
                    <p className="font-weight-bold m-0">Người tạo </p>
                    <p className="pb-4">(Ký và ghi rõ họ tên)</p>
                  </Col>
                </Row>

                <div className="mt-5 mb-1">
                  <div className="text-right d-print-none">
                    {invoiceDetail.status === 'Chưa thanh toán' ? (
                      <PrintButtonConfirm {...options} />
                    ) : (
                      <Button color="primary" onClick={handleOnPrint}>
                        <i className="uil uil-print mr-1"></i>In hóa đơn
                      </Button>
                    )}

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

export default InvoiceDetail;
