import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import React from 'react';
import { Row, Col, Button, Card, CardBody, Label, InputGroupAddon, FormGroup, CustomInput } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const NewPatient = () => {
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
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="header-title mt-0 mb-1">Bootstrap Validation - Normal</h4>
              <p className="sub-header">
                Provide valuable, actionable feedback to your users with HTML5 form validation–available in all our
                supported browsers.
              </p>
              <AvForm>
                <AvField name="firstname" label="Họ tên" type="text" required />
                <AvField name="lastname" label="Last Name" type="text" required />

                <AvGroup>
                  <Label for="username">Username</Label>
                  <div className="input-group">
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <AvInput placeholder="Username" name="username" required />
                    <AvFeedback>Please choose a username.</AvFeedback>
                  </div>
                </AvGroup>

                <AvField name="City" label="City" type="text" required />
                <AvField name="State" label="State" type="text" required />
                <AvField name="Zip" label="Zip" type="text" required />

                <FormGroup>
                  <AvInput
                    tag={CustomInput}
                    type="checkbox"
                    name="customCheckbox"
                    label="Agree to terms and conditions"
                    required
                  />
                </FormGroup>

                <Button color="primary" type="submit">
                  Submit
                </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NewPatient;
