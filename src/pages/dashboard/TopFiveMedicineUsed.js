import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Table } from 'reactstrap';
import { getTopFiveMedicineUsed } from '../../redux/statistic/action';

const TopFiveMedicinedUsed = () => {
  const dispatch = useDispatch();
  const topFiveUsed = useSelector((state) => state.Statistic.topFiveUsed);

  let topFive = new Array(5).fill({});

  useEffect(() => {
    dispatch(getTopFiveMedicineUsed());
    return () => {};
  }, [dispatch]);

  if (topFiveUsed) {
    topFive = topFiveUsed.items;
  }

  return (
    <Card>
      <CardBody className="pb-0">
        <h5 className="card-title mt-0 mb-0 header-title">Top thuốc có số lần dùng nhiều nhất</h5>

        <Table hover responsive className="mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên thuốc</th>
              <th scope="col" className="text-danger font-weight-bold">
                Số lần dùng
              </th>
              <th scope="col">Số lượng dùng</th>
              <th scope="col">Đơn vị</th>
            </tr>
          </thead>
          <tbody>
            {topFive.map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.medicineName}</td>
                <td className="text-danger font-weight-bold">{item.timesUsed}</td>
                <td>{item.qtyUsed}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TopFiveMedicinedUsed;
