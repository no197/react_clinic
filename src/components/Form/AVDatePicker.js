import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import React, { useRef, useState } from 'react';
import { Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import { useEffect } from 'react';

const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const offset = date.getTimezoneOffset();
  const UTCDate = new Date(date.getTime() - offset * 60 * 1000);
  const strFormat = UTCDate.toISOString().split('T')[0];
  return strFormat;
};

const getDateValidate = ({ value, units }) => {
  // FIXME: 12/04/20 bug if date == now
  // if (!value || !units) return null;

  const date = new Date();
  switch (units) {
    case 'days':
      date.setDate(date.getDate() + value);
      return date;
    case 'months':
      date.setMonth(date.getMonth() + value);
      return date;
    case 'years':
      date.setFullYear(date.getFullYear() + value);
      return date;
    default:
      return null;
  }
};

export default function AVDatePicker({ defaultValue, ...props }, ctx) {
  const [date, setDate] = useState(() => new Date(formatDate(defaultValue)));
  const [error, setError] = useState(false);
  const dateRef = useRef();

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const { validate, label, name, options } = props;
  return (
    <AvGroup>
      <div className="form-group">
        <Label for="datePicker">{label}</Label>
        <Flatpickr
          className={error ? 'form-control is-invalid' : 'form-control'}
          value={date} // giá trị ngày tháng
          // các option thêm cho thư viện
          options={options}
          // event
          onChange={([dateSelect]) => {
            if (dateSelect === undefined) return;

            // Validate date
            if (validate) {
              const { start, end } = validate.dateRange;
              console.log(start, end);
              const startDate = getDateValidate(start);
              const endDate = getDateValidate(end);

              setError(startDate && dateSelect.getTime() < startDate.getTime());
              setError(endDate && dateSelect.getTime() > endDate.getTime());
            }

            //Set date data
            const input = dateRef.current.FormCtrl.getInput(name);
            input.onBlurHandler(formatDate(dateSelect));
            setDate(dateSelect);
          }}
        />
      </div>
      <AvField ref={dateRef} name={name} type="date" hidden value={formatDate(date)} validate={validate} />
    </AvGroup>
  );
}
