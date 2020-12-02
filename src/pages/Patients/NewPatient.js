import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const Patient = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Bệnh nhân', path: '/app/patients' },
                            {
                                label: 'Thêm bệnh nhân',
                                path: '/app/patients/new',
                                active: true,
                            },
                        ]}
                        title={'Thêm bệnh nhân'}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Patient;
