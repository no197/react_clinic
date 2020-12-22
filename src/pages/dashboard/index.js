import React from 'react';
import { Row, Col } from 'reactstrap';

import { Users, ShoppingBag, Archive } from 'react-feather';

import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TopFiveMedicinedUsed from './TopFiveMedicineUsed';
import TopFiveMedicineQty from './TopFiveMedicineQty';
import { useTranslation } from 'react-i18next';
// class Dashboard extends Component {
//   constructor(props) {
//     super(props);

//     var oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

//     this.state = {
//       user: getLoggedInUser(),
//       filterDate: [oneWeekAgo, new Date()],
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="">
//           {/* preloader */}
//           {this.props.loading && <Loader />}

//           <Row className="page-title align-items-center">
//             <Col sm={4} xl={6}>
//               <h4 className="mb-1 mt-0">Trang chủ</h4>
//             </Col>
//           </Row>

//           {/* stats */}
//           <Statistics></Statistics>

//           {/* charts */}
//           <Row>
//             <Col xl={9}>
//               <RevenueChart />
//             </Col>

//             <Col xl={3}>
//               <OverviewWidget
//                 title="Công việc cần làm"
//                 items={[
//                   { title: '2', description: 'Bệnh nhân chờ khám', icon: Users },
//                   { title: '5', description: 'Hóa đơn chờ thanh toán', icon: ShoppingBag },
//                   { title: '4', description: 'Loại thuốc cần nhập thêm', icon: Archive },
//                 ]}></OverviewWidget>
//             </Col>
//           </Row>

//           {/* charts */}
//           <Row>
//             <Col xl={6}>
//               <TopFiveMedicinedUsed />
//             </Col>
//             <Col xl={6}>
//               <TopFiveMedicineQty />
//             </Col>
//           </Row>
//         </div>
//       </React.Fragment>
//     );
//   }
// }
const Dashboard = ({ props, loading }) => {
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

  const [t] = useTranslation();
  return (
    <React.Fragment>
      <div className="">
        <Row className="page-title align-items-center">
          <Col sm={4} xl={6}>
            <h4 className="mb-1 mt-0">{t('appMenu.dashboard')}</h4>
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
              title={t('dashboard.todolist')}
              items={[
                { title: '2', description: `${t('dashboard.waitPatient')}`, icon: Users },
                { title: '5', description: `${t('dashboard.waitInvoice')}`, icon: ShoppingBag },
                { title: '4', description: `${t('dashboard.waitMedicine')}`, icon: Archive },
              ]}></OverviewWidget>
          </Col>
        </Row>

        {/* charts */}
        <Row>
          <Col xl={6}>
            <TopFiveMedicinedUsed />
          </Col>
          <Col xl={6}>
            <TopFiveMedicineQty />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
