import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { deleteMedicines, getMedicines} from '../../redux/Medicines/actions';
import DeletePatientButton from '../../components/Confirm/DeleteButtonConfirm';
import * as FeatherIcon from 'react-feather';
const MedicinesList = ({ medicines, getMedicines }) => {
  useEffect(() => {
    getMedicines();
    return () => {};
  }, [getMedicines]);

  let items = [];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Cột action
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const options = {
      Icon: FeatherIcon.AlertCircle, // Icon confirm
      headerTitle: 'Xác nhận xóa', // Header confirm
      content: 'Hành động này sẽ xóa hoàn toàn nhân ra khỏi hệ thống. Bạn thật sự muốn xóa loại thuốc đã chọn?',
      okeBtn: {
        text: 'Xóa thuốc',
        color: 'danger',
        onClick: () =>  deleteMedicines(row.medicineId), // truyền action cần dispatch
      },
      cancelBtn: {
        text: 'Hủy bỏ',
        color: 'light',
      },
    };
    return (
      <React.Fragment>
        <Link to={`/app/medicines/${row.medicineId}`}>
          <Button color="warning" className="mr-2">
            <i className="uil-pen"></i>
          </Button>
        </Link>
        <DeletePatientButton {...options} />
      </React.Fragment>
    );
  };

  if (medicines) {
    ({ items } = medicines);
  }

  const columns = [
    {
      dataField: 'medicineId',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'medicineName',
      text: 'Tên Loại Thuốc',
      sort: true,
    },
    {
      dataField: 'unit',
      text: 'Đơn Vị',
      sort: false,
    },
    {
      dataField: 'price',
      text: 'Đơn Giá',
      sort: true,
    },
    {
      dataField: 'quantity',
      text: 'Số Lượng',
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
      dataField: 'medicineId',
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
                label: 'Thuốc',
                path: '/app/medicines',
                active: true,
              },
            ]}
            title={'Danh sách Thuốc'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group">
            <Link to="/app/medicines/new">
              <Button color="primary mb-2">
                <i className="uil-plus mr-1"></i>Thêm thuốc
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-4">Danh sách thuốc</h4>
              {medicines && (
                <ToolkitProvider
                  bootstrap4
                  keyField="medicineId"
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
                        keyField="medicineId"
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
  medicines: state.Medicine.medicines,
});

export default connect(mapStateToProps, { getMedicines })(MedicinesList);
