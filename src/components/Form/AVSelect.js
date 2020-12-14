import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Select from 'react-select';
import { Label } from 'reactstrap';

export default function AVSelect({ defaultValue, ...props }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);
  const selectRef = useRef();
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const { options, placeholder, name, errorMessage, label, onChangeCallback } = props;

  const handleTouchedSelect = (option, type = 'change') => {
    const value = option ? option.value : '';

    if (type === 'blur' && value && value === selectedValue) return;

    //Handle validate error
    const input = selectRef.current;
    input.onBlurHandler(value);

    //Handle set value select and errors
    setError(!value);
    setSelectedValue(option);
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(option);
    }
  };

  return (
    <AvGroup>
      <Label for="input">{label}</Label>
      <Select
        className={error ? 'react-select-error' : 'react-select'}
        classNamePrefix="react-select"
        value={selectedValue}
        defaultValue={selectedValue}
        placeholder={placeholder}
        onChange={(opt) => handleTouchedSelect(opt)}
        options={options}
        onBlur={() => handleTouchedSelect(selectedValue, 'blur')}
        name={`${name}Select`}
      />
      <AvInput ref={selectRef} type="hidden" name={name} value={selectedValue ? selectedValue.value : ''} required />
      <AvFeedback>{errorMessage}</AvFeedback>
    </AvGroup>
  );
}
