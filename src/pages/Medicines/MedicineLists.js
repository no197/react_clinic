import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import { deleteMedicines, getMedicines } from '../../redux/Medicines/actions';
import DeletePatientButton from '../../components/Confirm/DeleteButtonConfirm';
import * as FeatherIcon from 'react-feather';
const MedicinesList = ({ medicines, getMedicines }) => {
  useEffect(() => {
    getMedicines();
    return () => {};
  }, [getMedicines]);
  const [t, i18n] = useTranslation();
  let items = [];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  // Cột action
  const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
    const options = {
      Icon: FeatherIcon.AlertCircle, // Icon confirm
      headerTitle: `${t('medicine.deleteMedicineHeader')}`, // Header confirm
      content: `${t('medicine.deteleMedicineTitle')}`,
      okeBtn: {
        text: `${t('medicine.deleteMedicine')}`,
        color: 'danger',
        onClick: () => deleteMedicines(row.medicineId), // truyền action cần dispatch
      },
      cancelBtn: {
        text: `${t('medicine.deleteCancel')}`,
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
      dataField: 'stt',
      text: 'STT',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      exportCSV: false,
    },
    {
      dataField: 'medicineId',
      text: 'ID',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'medicineName',
      text: `${t('medicine.MedicineName')}`,
      sort: true,
    },
    {
      dataField: 'unit',
      text: `${t('medicine.unit')}`,
      sort: false,
    },
    {
      dataField: 'price',
      text: `${t('medicine.price')}`,
      sort: true,
    },
    {
      dataField: 'quantity',
      text: `${t('medicine.quantity')}`,
      sort: false,
    },
    {
      dataField: 'action',
      text: `${t('medicine.MedicineAction')}`,
      formatter: ActionColumn,
      csvExport: false,
    },
  ];

  const defaultSorted = [
    {
      dataField: 'medicineId',
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
                label: `${t('appMenu.medicine')}`,
                path: '/app/medicines',
                active: true,
              },
            ]}
            title={`${t('appMenu.medicineList')}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group">
            <Link to="/app/medicines/new">
              <Button color="primary mb-2">
                <i className="uil-plus mr-1"></i>
                {t('medicine.newMedicine')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-4">{t('appMenu.medicineList')}</h4>
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
