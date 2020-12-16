import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { Users, ShoppingBag, Archive } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';
import Orders from './Orders';
import Performers from './Performers';
import Tasks from './Tasks';
import Chat from './Chat';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

    this.state = {
      user: getLoggedInUser(),
      filterDate: [oneWeekAgo, new Date()],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          {/* preloader */}
          {this.props.loading && <Loader />}

          <Row className="page-title align-items-center">
            <Col sm={4} xl={6}>
              <h4 className="mb-1 mt-0">Trang chủ</h4>
            </Col>
          </Row>

          {/* stats */}
          <Statistics></Statistics>

          {/* charts */}
          <Row>
            <Col xl={9}>
              <RevenueChart />
            </Col>

            <Col xl={3}>
              <OverviewWidget
                title="Công việc cần làm"
                items={[
                  { title: '2', description: 'Bệnh nhân chờ khám', icon: Users },
                  { title: '5', description: 'Hóa đơn chờ thanh toán', icon: ShoppingBag },
                  { title: '4', description: 'Loại thuốc cần nhập thêm', icon: Archive },
                ]}></OverviewWidget>
            </Col>
          </Row>

          {/* charts */}
          <Row>
            <Col xl={5}>
              <SalesChart />
            </Col>
            <Col xl={7}>
              <Orders />
            </Col>
          </Row>

          <Row>
            <Col xl={4}>
              <Performers />
            </Col>
            <Col xl={4}>
              <Tasks />
            </Col>
            <Col xl={4}>
              <Chat />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
