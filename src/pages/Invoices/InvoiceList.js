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
import { getInvoices } from '../../redux/invoices/actions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const InvoiceList = ({ invoices, getInvoices }) => {
  // Use effect to get items
  useEffect(() => {
    getInvoices();
    return () => {};
  }, [getInvoices]);
  const [t, i18n] = useTranslation();
  // Destruct UI Componenet for TookitProvider
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Get Items to display on table
  let items = [];
  if (invoices) {
    ({ items } = invoices);
  }

  // Config action column
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    return (
      <React.Fragment>
        {/* <ButtonAppointmentModal patient={row} /> */}
        <Link to={`/app/invoices/${row.invoiceId}`}>
          <Button className="mr-2" color="info" onClick={() => {}}>
            <i className="uil-file-medical-alt"></i> {t('invoice.readInvoice')}
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
      dataField: 'invoiceId',
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
      dataField: 'price',
      text:`${t('invoice.price')}`,
      sort: false,
    },
    {
      dataField: 'createdDate',
      text: `${t('appoitment.createdDate')}`,
      formatter: (cell, row, rowIndex) => {
        return moment(new Date(row.createdDate)).format('DD/MM/YYYY'); //Format datetime
      },
      sort: true,
    },
    {
      dataField: 'status',
      text:`${t('invoice.status')}`,
      sort: false,
    },
    {
      dataField: 'action',
      text: `${t('invoice.action')}`,
      editable: false,
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  //Config default sort
  const defaultSorted = [
    {
      dataField: 'invoiceId',
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
                label: `${t('appMenu.examination')}`,
                path: '/app/examinations',
                active: true,
              },
            ]}
            title={`${t('invoice.list')}`}
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
              <h4 className="header-title mt-0 mb-4">{t('invoice.list')}</h4>

              {/* Table and Tookit(Search & Export pdf) */}
              {invoices && (
                <ToolkitProvider
                  bootstrap4
                  keyField="invoiceId"
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
                        keyField="invoiceId"
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
  invoices: state.Invoices.invoices,
});

export default connect(mapStateToProps, { getInvoices })(InvoiceList);
