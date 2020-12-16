// Import react, effect and router
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
import { deletePatients, getPatients } from '../../redux/patients/actions';
import { createAppointment } from '../../redux/examinations/actions';

const PatientList = ({ patients, getPatients, createAppointment }) => {
  // Use effect to get items
  useEffect(() => {
    getPatients();
    return () => {};
  }, [getPatients]);

  // Destruct UI Componenet for TookitProvider
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Get Items to display on table
  let items = [];
  if (patients) {
    ({ items } = patients);
  }

  // Config action column
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const { patientId } = row;

    const options = {
      Icon: FeatherIcon.AlertCircle, // Icon confirm
      headerTitle: 'Xác nhận xóa', // Header confirm
      content: 'Hành động này sẽ xóa hoàn toàn bệnh nhân ra khỏi hệ thống. Bạn thật sự muốn xóa bệnh nhân đã chọn?',
      okeBtn: {
        text: 'Xóa bệnh nhân',
        color: 'danger',
        onClick: () => deletePatients(patientId), // truyền action cần dispatch
      },
      cancelBtn: {
        text: 'Hủy bỏ',
        color: 'light',
      },
    };

    return (
      <React.Fragment>
        {/* <ButtonAppointmentModal patient={row} /> */}
        <Button
          className="mr-2"
          color="primary"
          onClick={() => {
            const appoint = {
              patientId,
              dateOfAppointment: moment().format('YYYY-MM-DD'),
              status: 'Đang chờ',
            };
            createAppointment(appoint);
          }}>
          <i className="uil-plus"></i>
        </Button>
        <Link to={`/app/patients/${patientId}`}>
          <Button color="warning" className="mr-2">
            <i className="uil-pen"></i>
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
      dataField: 'patientId',
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
                label: 'Bệnh nhân',
                path: '/app/patients',
                active: true,
              },
            ]}
            title={'Danh sách bệnh nhân'}
          />
        </Col>
      </Row>

      {/* Icon on top */}
      <Row>
        <Col>
          <div className="form-group">
            <Link to="/app/patients/new">
              <Button color="primary mb-2">
                <i className="uil-plus mr-1"></i>Thêm bệnh nhân
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Main content  */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* Title  */}
              <h4 className="header-title mt-0 mb-4">Danh sách bệnh nhân</h4>

              {/* Table and Tookit(Search & Export pdf) */}
              {patients && (
                <ToolkitProvider
                  bootstrap4
                  keyField="patientId"
                  data={items}
                  columns={columns}
                  search
                  exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                  {(props) => (
                    <React.Fragment>
                      <Row>
                        <Col>
                          {/* Search bar */}
                          <SearchBar {...props.searchProps} />
                        </Col>

                        {/* Export CSV */}
                        <Col className="text-right">
                          <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                            Export CSV
                          </ExportCSVButton>
                        </Col>
                      </Row>

                      {/* Table */}
                      <BootstrapTable
                        striped
                        bootstrap4
                        keyField="patientId"
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
  patients: state.Patient.patients,
});

const mapDispatchToProps = (dispatch) => ({
  getPatients: () => dispatch(getPatients()),
  createAppointment: (appoint) => dispatch(createAppointment(appoint)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
