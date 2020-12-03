import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const PatientDetail = (props) => {
  const { id } = props.match.params;
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Bệnh nhân', path: '/app/patients' },
              {
                label: 'Chi tiết bệnh nhân',
                path: `/app/patients/${id}`,
                active: true,
              },
            ]}
            title={'Chi tiết bệnh nhân'}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PatientDetail;
