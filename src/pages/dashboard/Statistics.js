// @flow
import React, { useEffect, useLayoutEffect } from 'react';
import { Row, Col } from 'reactstrap';

import * as FeatherIcon from 'react-feather';
import StatisticsWidget from '../../components/StatisticsWidget';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralStatistic } from '../../redux/statistic/action';
import formatCash from '../../helpers/formatCash';

const Statistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.Statistic.generalStatistic);

  useLayoutEffect(() => {
    dispatch(getGeneralStatistic());
    return () => {};
  }, [dispatch]);

  let numOfPatient = 0,
    numOfExam = 0,
    examRevenue = 0,
    totalRevenue = 0;

  if (statistics) {
    ({ numOfExam, numOfPatient, examRevenue, totalRevenue } = statistics);
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Số bệnh nhân trong tháng"
            title={numOfPatient}
            icon={FeatherIcon.User}
            iconClass="icon-dual-primary"></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Số khám bệnh trong tháng"
            title={numOfExam}
            icon={FeatherIcon.FileText}
            iconClass="icon-dual-warning"></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Tiền khám bệnh trong tháng"
            title={`${formatCash(examRevenue)} đ`}
            icon={FeatherIcon.ShoppingBag}
            iconClass="icon-dual-success"></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Tổng doanh thu trong tháng"
            title={`${formatCash(totalRevenue)} đ`}
            icon={FeatherIcon.Target}
            iconClass="icon-dual-info"></StatisticsWidget>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Statistics;
