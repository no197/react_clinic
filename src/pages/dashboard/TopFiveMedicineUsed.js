import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Table } from 'reactstrap';
import { getTopFiveMedicineUsed } from '../../redux/statistic/action';
import { useTranslation } from 'react-i18next';
const TopFiveMedicinedUsed = () => {
  const dispatch = useDispatch();
  const topFiveUsed = useSelector((state) => state.Statistic.topFiveUsed);
  const [t] = useTranslation();
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
        <h5 className="card-title mt-0 mb-0 header-title">{t('dashboard.topMedicine')}</h5>

        <Table hover responsive className="mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{t('medicine.MedicineName')}</th>
              <th scope="col" className="text-danger font-weight-bold">
                {t('statistic.timesUsed')}
              </th>
              <th scope="col">{t('statistic.qtyUsed')}</th>
              <th scope="col">{t('medicine.unit')}</th>
            </tr>
          </thead>
          <tbody>
            {topFive.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.medicineName}</td>
                <td className="text-danger font-weight-bold">{item.timesUsed}</td>
                <td>{item.qtyUsed}</td>
                <td>{t(`medicine.${item.unit}`)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TopFiveMedicinedUsed;
