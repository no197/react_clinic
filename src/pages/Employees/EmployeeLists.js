import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { deleteEmployees, getEmployees } from '../../redux/Employees/actions';
import DeletePatientButton from '../../components/Confirm/DeleteButtonConfirm';
import * as FeatherIcon from 'react-feather';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
const EmployeesList = ({ employees, getEmployees }) => {
  useEffect(() => {
    getEmployees();
    return () => {};
  }, [getEmployees]);
  const [t, i18n] = useTranslation();
  let items = [];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Cột action
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const options = {
      Icon: FeatherIcon.AlertCircle, // Icon confirm
      headerTitle: `${t('employee.deleteEmployeeHeader')}`, // Header confirm
      content: `${t('employee.deteleEmployeeTitle')}`,
      okeBtn: {
        text: `${t('employee.deleteEmployee')}`,
        color: 'danger',
        onClick: () => deleteEmployees(row.employeeId), // truyền action cần dispatch
      },
      cancelBtn: {
        text: `${t('employee.deleteCancel')}`,
        color: 'light',
      },
    };
    return (
      <React.Fragment>
        <Link to={`/app/employees/${row.employeeId}`}>
          <Button color="warning" className="mr-2">
            <i className="uil-pen"></i>
          </Button>
        </Link>
        <DeletePatientButton {...options} />
      </React.Fragment>
    );
  };

  if (employees) {
    ({ items } = employees);
  }

  const columns = [
    {
      dataField: 'stt',
      text: 'STT',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      exportCSV: false,
    },
    {
      dataField: 'employeeId',
      text: 'ID',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'fullName',
      text: `${t('employee.EmployeeName')}`,
      sort: true,
    },
    {
      dataField: 'gender',
      text: `${t('employee.EmployeeGender')}`,
      sort: false,
    },
    {
      dataField: 'dateOfBirth',
      text: `${t('employee.EmployeeDOB')}`,
      formatter: (cell, row, rowIndex) => {
        return moment(new Date(row.dateOfBirth)).format('DD/MM/YYYY'); //Format datetime
      },
      sort: true,
    },
    {
      dataField: 'address',
      text: `${t('employee.EmployeeAddress')}`,
      sort: false,
    },
    {
      dataField: 'position',
      text: `${t('employee.EmployeePosition')}`,
      sort: false,
    },
    {
      dataField: 'action',
      text: `${t('employee.EmployeeAction')}`,
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  const defaultSorted = [
    {
      dataField: 'employeeId',
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

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col>
          <PageTitle
            breadCrumbItems={[
              {
                label: `${t('appMenu.employee')}`,
                path: '/app/employees',
                active: true,
              },
            ]}
            title={`${t('appMenu.employeeList')}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group">
            <Link to="/app/employees/new">
              <Button color="primary mb-2">
                <i className="uil-plus mr-1"></i>
                {t('employee.newEmployee')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-4">{t('appMenu.employeeList')}</h4>
              {employees && (
                <ToolkitProvider
                  bootstrap4
                  keyField="employeeId"
                  data={items}
                  columns={columns}
                  search
                  exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                  {(props) => (
                    <React.Fragment>
                      <Row>
                        <Col>
                          <SearchBar {...props.searchProps} placeholder={t('table.search')} />
                        </Col>
                        <Col className="text-right">
                          <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                            {t('table.exportCSV')}
                          </ExportCSVButton>
                        </Col>
                      </Row>

                      <BootstrapTable
                        striped
                        bootstrap4
                        keyField="employeeId"
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
  employees: state.Employees.employees,
});

export default connect(mapStateToProps, { getEmployees })(EmployeesList);
