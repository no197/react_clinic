// Import react, effect and router
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Import format date and Icon
import moment from 'moment';

//Import UI Components and Icon
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import PageTitle from '../../components/PageTitle';

//Import action to dispatch
import { getExaminations } from '../../redux/examinations/actions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const ExaminationList = ({ appointments, getExaminations }) => {
  // Use effect to get items
  useEffect(() => {
    getExaminations();
    return () => {};
  }, [getExaminations]);
  const [t] = useTranslation();
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
    return (
      <React.Fragment>
        {/* <ButtonAppointmentModal patient={row} /> */}
        <Link to={`/app/examinations/${row.examinationId}`}>
          <Button className="mr-2" color="primary" onClick={() => {}}>
            <i className="uil-file-medical-alt"></i> Xem phiếu khám
          </Button>
        </Link>
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
      dataField: 'examinationId',
      text: 'ID',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'patientName',
      text: `${t('patient.patientName')}`,
      sort: false,
    },
    {
      dataField: 'createdDate',
      text: `${t('examination.createdDate')}`,
      formatter: (cell, row, rowIndex) => {
        return moment(new Date(row.createdDate)).format('DD/MM/YYYY'); //Format datetime
      },
      sort: true,
    },
    {
      dataField: 'diagnose',
      text: `${t('examination.diagnose')}`,
      sort: false,
    },
    {
      dataField: 'action',
      text: `${t('examination.ExaminationAction')}`,
      editable: false,
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  //Config default sort
  const defaultSorted = [
    {
      dataField: 'examinationId',
      order: 'desc',
    },
  ];

  const paginationOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: t('table.first'),
    prePageText: t('table.back'),
    nextPageText: t('table.next'),
    lastPageText: t('table.last'),
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
                label: `${t('appMenu.examination')}`,
                path: '/app/examinations',
                active: true,
              },
            ]}
            title={`${t('appMenu.examinationList')}`}
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
              <h4 className="header-title mt-0 mb-4">{t('appMenu.examinationList')}</h4>

              {/* Table and Tookit(Search & Export pdf) */}
              {appointments && (
                <ToolkitProvider
                  bootstrap4
                  keyField="examinationId"
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
                        keyField="examinationId"
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

export default connect(mapStateToProps, { getExaminations })(ExaminationList);
