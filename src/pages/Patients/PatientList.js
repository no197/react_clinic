import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const PatientList = () => {
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
          <div class="form-group">
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
              <h4 className="header-title mt-0 mb-1">Danh sách bệnh nhân</h4>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={records}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(paginationOptions)}
                wrapperClasses="table-responsive"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PatientList;
