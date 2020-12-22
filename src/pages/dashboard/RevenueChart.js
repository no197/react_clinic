import React, { useCallback, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getRevenueInRange } from '../../redux/statistic/action';
import formatCash from '../../helpers/formatCash';
import { useTranslation } from 'react-i18next';
const RevenueChart = () => {
  const revenueInRange = useSelector((state) => state.Statistic.revenueInRange);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const numOfDate = 7;
  const chartData = Array(numOfDate).fill(0);

  const getDate = useCallback((numOfDate) => moment().subtract(numOfDate, 'd').format('YYYY-MM-DD'), []);

  useEffect(() => {
    const fromDate = getDate(numOfDate);
    const toDate = getDate(0);
    dispatch(getRevenueInRange({ fromDate, toDate }));
    return () => {};
  }, [dispatch, getDate]);

  const getDaysInMonth = (numOfDate = 7) => {
    var days = [];
    for (let idx = numOfDate - 1; idx >= 0; idx--) {
      const d = moment().subtract(idx, 'd').format('DD-MM-YYYY');
      days.push(d);
    }
    return days;
  };

  var labels = getDaysInMonth(numOfDate);
  if (revenueInRange) {
    const { items } = revenueInRange;
    for (let item of items) {
      let formatDate = moment(item.date).format('DD-MM-YYYY');
      let index = labels.indexOf(formatDate);
      chartData[index] = item.revenue;
    }
  }

  const apexLineChartWithLables = {
    chart: {
      height: 296,
      type: 'area',
      toolbar: {
        show: true,
      },
      parentHeightOffset: 0,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    zoom: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#43d39e'],
    xaxis: {
      type: 'string',
      categories: labels,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {},
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return formatCash(val) + 'đ';
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
    },
  };

  const apexLineChartWithLablesData = [
    {
      name: `${t('dashboard.revenue')}`,
      data: chartData,
    },
  ];

  return (
    <Card>
      <CardBody className="pb-0">
        <h5 className="card-title mb-0 header-title">{t('dashboard.revenue7day')}</h5>

        <Chart
          options={apexLineChartWithLables}
          series={apexLineChartWithLablesData}
          type="area"
          className="apex-charts mt-3"
          height={296}
        />
      </CardBody>
    </Card>
  );
};

export default RevenueChart;
