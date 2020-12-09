import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

import { deletePatients, getPatients } from '../../redux/patients/actions';

import PageTitle from '../../components/PageTitle';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { confirmAlert } from 'react-confirm-alert';



const PatientList = ({ patients, getPatients, deletePatient }) => {
  useEffect(() => {
 
    getPatients();
    return () => {};
  }, [getPatients]);

  let items = [];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // // Cột action
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const onClickDelete = ()=> {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Xóa',
            onClick: () => deletePatient(row.patientId)
          },
          {
            label: 'Không',
            onClick: () => {}
          }
        ]
      });
    }
    return (
      <React.Fragment>
        <Link to={`/app/patients/${row.patientId}`}>
          <Button color="warning" className="mr-2">
            <i className="uil-pen"></i>
          </Button>
        </Link>
        <Button color="danger" onClick={onClickDelete}>
          <i className="uil-trash-alt"></i>
        </Button>
      </React.Fragment>
    );
  };

  if (patients) {
    ({ items } = patients);
  }

  const columns = [
    {
      dataField: 'patientId',
      text: 'ID',
      sort: true,
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
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  const defaultSorted = [
    {
      dataField: 'patientId',
      order: 'asc',
    },
  ];

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

  return (
    <React.Fragment>
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
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-4">Danh sách bệnh nhân</h4>
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
                          <SearchBar {...props.searchProps} />
                        </Col>
                        <Col className="text-right">
                          <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                            Export CSV
                          </ExportCSVButton>
                        </Col>
                      </Row>

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

const mapDispatchToProps = (dispatch) =>({
  getPatients: ()=>dispatch(getPatients()),
  deletePatient: (id) =>dispatch(deletePatients(id))
})

export default connect(mapStateToProps, { getPatients })(PatientList);
