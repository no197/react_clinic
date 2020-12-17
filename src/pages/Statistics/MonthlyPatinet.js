// Import react, effect and router
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//Import format date and Icon
import moment from 'moment';

//Import UI Components and Icon
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import PageTitle from '../../components/PageTitle';

//Import action to dispatch
import MaskedInput from 'react-text-mask';
import { getMonthlyPatient } from '../../redux/statistic/action';

const MonthlyPatient = ({ monthlyPatient, getMonthlyPatient }) => {
  const [monthYear, setMonthYear] = useState(() => moment().format('MM/YYYY'));

  // Use effect to get items
  useEffect(() => {
    const [month, year] = monthYear.split('/');
    getMonthlyPatient({ month, year });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMonthlyPatient]);

  // Destruct UI Componenet for TookitProvider
  const { ExportCSVButton } = CSVExport;

  const handleChangeMonthYear = (evt) => {
    const { value } = evt.target;
    if (/^((0[1-9])|(1[0-2]))\/(\d{4})$/.test(value)) {
      const [month, year] = value.split('/');
      getMonthlyPatient({ month, year });
    }
    setMonthYear(value);
  };

  // Get Items to display on table
  let items = [];
  if (monthlyPatient) {
    ({ items } = monthlyPatient);
  }
  console.log(items);

  // Config all column for table
  const columns = [
    {
      dataField: 'stt',
      text: 'STT',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      exportCSV: false,
    },
    {
      dataField: 'patientId',
      text: 'ID',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'fullName',
      text: 'Họ tên',
      sort: true,
    },
    {
      dataField: 'gender',
      text: 'Giới tính',
      sort: false,
    },
    {
      dataField: 'dateOfBirth',
      text: 'Ngày sinh',
      formatter: (cell, row, rowIndex) => {
        return moment(new Date(row.dateOfBirth)).format('DD/MM/YYYY'); //Format datetime
      },
      sort: true,
    },
    {
      dataField: 'address',
      text: 'Địa chỉ',
      sort: false,
    },
    {
      dataField: 'phoneNumber',
      text: 'Số điện thoại',
      sort: false,
    },
  ];

  //Config default sort
  const defaultSorted = [
    {
      dataField: 'date',
      order: 'asc',
    },
  ];

  // Render component

  return (
    <React.Fragment>
      {/* BeadCrumb */}
      <Row className="page-title  d-print-none">
        <Col>
          <PageTitle
            breadCrumbItems={[
              {
                label: 'Báo cáo',
                active: true,
              },
              {
                label: 'Báo cáo Bệnh nhân',
                active: true,
              },
            ]}
            title={'Thống kê Bệnh nhân theo tháng'}
          />
        </Col>
      </Row>

      {/* Main content  */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* Title  */}
              <h4 className="header-title mt-0 mb-4">Thống kê Bệnh nhân theo tháng</h4>

              {/* Table and Tookit(Search & Export pdf) */}
              {monthlyPatient && (
                <ToolkitProvider
                  bootstrap4
                  keyField="patientId"
                  data={items}
                  columns={columns}
                  search
                  exportCSV={{
                    exportAll: true,
                    noAutoBOM: false,
                  }}>
                  {(props) => (
                    <React.Fragment>
                      <Row>
                        <Col>
                          {/* Search bar */}
                          <Col lg={6}>
                            <div className="form-group">
                              <label>Tháng năm báo cáo</label> <br />
                              <MaskedInput
                                mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                // placeholder="__/____"
                                value={monthYear}
                                placeholder="Nhập tháng năm"
                                className="form-control"
                                onChange={handleChangeMonthYear}
                              />
                            </div>
                          </Col>
                        </Col>

                        {/* Export CSV */}
                        <Col className="text-right">
                          <ExportCSVButton {...props.csvProps} className="btn btn-primary d-print-none">
                            Xuất CSV
                          </ExportCSVButton>
                        </Col>
                      </Row>

                      {/* Table */}
                      <BootstrapTable
                        striped
                        noDataIndication={<p className="text-center">Không có Bệnh nhân trong tháng cần thống kê</p>}
                        bootstrap4
                        keyField="patientId"
                        data={items}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        wrapperClasses="table-responsive"
                        {...props.baseProps}
                      />
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}
              <div className="text-right d-print-none">
                <Button
                  color="primary"
                  onClick={(e) => {
                    window.print();
                  }}>
                  <i className="uil uil-print mr-1"></i>In báo cáo
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  monthlyPatient: state.Statistic.monthlyPatient,
});

const mapDispatchToProps = (dispatch) => ({
  getMonthlyPatient: (params) => dispatch(getMonthlyPatient(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPatient);
