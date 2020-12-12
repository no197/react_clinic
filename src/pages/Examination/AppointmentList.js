// Import react, effect and router
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Import format date and Icon
import moment from 'moment';
import * as FeatherIcon from 'react-feather';

//Import UI Components and Icon
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { DeleteButtonConfirm } from '../../components/Confirm/DeleteButtonConfirm';
import PageTitle from '../../components/PageTitle';

//Import action to dispatch
import { deleteAppointment, getAppointments } from '../../redux/examinations/actions';
import { Link } from 'react-router-dom';

const PatientList = ({ appointments, getAppointments }) => {
  // Use effect to get items
  useEffect(() => {
    getAppointments();
    return () => {};
  }, [getAppointments]);

  // Destruct UI Componenet for TookitProvider
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Get Items to display on table
  let items = [];
  if (appointments) {
    ({ items } = appointments);
  }

  // Config action column
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const options = {
      Icon: FeatherIcon.AlertCircle, // Icon confirm
      headerTitle: 'Xác nhận xóa', // Header confirm
      content: 'Hành động này sẽ xóa đăng kí khám bệnh của bệnh nhân. Bạn thật sự muốn xóa bệnh nhân đã chọn?',
      okeBtn: {
        text: 'Xóa đăng ký',
        color: 'danger',
        onClick: () => deleteAppointment(row.appointmentId), // truyền action cần dispatch
      },
      cancelBtn: {
        text: 'Hủy bỏ',
        color: 'light',
      },
    };

    return (
      <React.Fragment>
        {/* <ButtonAppointmentModal patient={row} /> */}
        <Link
          to={{
            pathname: `/app/examinations/add/${row.appointmentId}`,
            state: { patientName: row.patientName },
          }}>
          <Button className="mr-2" color="primary" onClick={() => {}}>
            <i className=" uil-book-medical"></i>
          </Button>
        </Link>

        <DeleteButtonConfirm {...options} />
      </React.Fragment>
    );
  };

  // Config all column for table
  const columns = [
    // STT column
    {
      dataField: 'stt',
      text: 'STT',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      exportCSV: false,
    },
    {
      dataField: 'appointmentId',
      text: 'ID',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'patientName',
      text: 'Tên bệnh nhân',
      sort: false,
    },
    {
      dataField: 'dateOfAppointment',
      text: 'Ngày hẹn khám',
      formatter: (cell, row, rowIndex) => {
        return moment(new Date(row.dateOfAppointment)).format('DD/MM/YYYY'); //Format datetime
      },
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Tình trạng',
      sort: false,
    },
    {
      dataField: 'action',
      text: 'Hành động',
      editable: false,
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  //Config default sort
  const defaultSorted = [
    {
      dataField: 'appointmentId',
      order: 'desc',
    },
  ];

  // Config pagination
  const paginationOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    // paginationTotalRenderer: customTotal,
    // sizePerPageRenderer: sizePerPageRenderer,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '25',
        value: 25,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  // Render component
  return (
    <React.Fragment>
      {/* BeadCrumb */}
      <Row className="page-title">
        <Col>
          <PageTitle
            breadCrumbItems={[
              {
                label: 'Khám bệnh',
                path: '/app/examinations',
                active: true,
              },
            ]}
            title={'Danh sách đăng ký khám bệnh'}
          />
        </Col>
      </Row>

      {/* Icon on top */}
      {/* <Row>
        <Col>
          <div className="form-group">
            <Link to="/app/patients/new">
              <Button color="primary mb-2">
                <i className="uil-plus mr-1"></i>Thêm bệnh nhân
              </Button>
            </Link>
          </div>
        </Col>
      </Row> */}

      {/* Main content  */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* Title  */}
              <h4 className="header-title mt-0 mb-4">Danh sách bệnh nhân</h4>

              {/* Table and Tookit(Search & Export pdf) */}
              {appointments && (
                <ToolkitProvider
                  bootstrap4
                  keyField="appointmentId"
                  data={items}
                  columns={columns}
                  search
                  exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                  {(props) => (
                    <React.Fragment>
                      <Row>
                        <Col>
                          {/* Search bar */}
                          <SearchBar {...props.searchProps} placeholder="Tìm kiếm" />
                        </Col>

                        {/* Export CSV */}
                        <Col className="text-right">
                          <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                            Xuất CSV
                          </ExportCSVButton>
                        </Col>
                      </Row>

                      {/* Table */}
                      <BootstrapTable
                        striped
                        bootstrap4
                        keyField="appointmentId"
                        data={items}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory(paginationOptions)}
                        wrapperClasses="table-responsive"
                        {...props.baseProps}
                      />
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  appointments: state.Examinations.appointments,
});

export default connect(mapStateToProps, { getAppointments })(PatientList);
