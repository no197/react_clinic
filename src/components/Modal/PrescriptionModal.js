import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AVSelect from '../Form/AVSelect';

let fakeMedicines = {
  totalItems: 30,
  items: [
    {
      medicineId: 1,
      medicineName: 'Fentanyl (citrat)',
      unit: 'viên',
      price: 30000,
      quantity: 500,
    },
    {
      medicineId: 2,
      medicineName: 'Halothan',
      unit: 'viên',
      price: 20000,
      quantity: 500,
    },
    {
      medicineId: 3,
      medicineName: 'Ketamin (hydroclorid)',
      unit: 'ống',
      price: 10000,
      quantity: 500,
    },
    {
      medicineId: 4,
      medicineName: 'Bupivacain hydroclorid',
      unit: 'bịch',
      price: 15000,
      quantity: 500,
    },
    {
      medicineId: 5,
      medicineName: 'Lidocain hydroclorid',
      unit: 'viên',
      price: 13000,
      quantity: 500,
    },
    {
      medicineId: 6,
      medicineName: 'Lidocain hydroclorid',
      unit: 'ống',
      price: 14000,
      quantity: 500,
    },
    {
      medicineId: 7,
      medicineName: 'Ephedrin hydroclorid',
      unit: 'ống',
      price: 21000,
      quantity: 500,
    },
    {
      medicineId: 8,
      medicineName: 'Diclofenac',
      unit: 'bịch',
      price: 17000,
      quantity: 500,
    },
    {
      medicineId: 9,
      medicineName: 'Ibuprofen',
      unit: 'bịch',
      price: 30000,
      quantity: 500,
    },
    {
      medicineId: 10,
      medicineName: 'Meloxicam',
      unit: 'ống',
      price: 20000,
      quantity: 500,
    },
    {
      medicineId: 11,
      medicineName: 'Paracetamol',
      unit: 'ống',
      price: 15000,
      quantity: 500,
    },
    {
      medicineId: 12,
      medicineName: 'Piroxicam',
      unit: 'ống',
      price: 9000,
      quantity: 500,
    },
    {
      medicineId: 13,
      medicineName: 'Morphin sulfat',
      unit: 'bịch',
      price: 12000,
      quantity: 500,
    },
    {
      medicineId: 14,
      medicineName: 'Cyclizin',
      unit: 'bịch',
      price: 13000,
      quantity: 500,
    },
    {
      medicineId: 15,
      medicineName: 'Dexamethason',
      unit: 'viên',
      price: 10000,
      quantity: 500,
    },
    {
      medicineId: 16,
      medicineName: 'Diazepam',
      unit: 'viên',
      price: 8000,
      quantity: 500,
    },
    {
      medicineId: 17,
      medicineName: 'Docusat natri',
      unit: 'viên',
      price: 25000,
      quantity: 500,
    },
    {
      medicineId: 18,
      medicineName: 'Lactulose ',
      unit: 'ống',
      price: 12000,
      quantity: 500,
    },
    {
      medicineId: 19,
      medicineName: 'Midazolam',
      unit: 'ống',
      price: 13000,
      quantity: 500,
    },
    {
      medicineId: 20,
      medicineName: 'Alimemazin',
      unit: 'viên',
      price: 12000,
      quantity: 500,
    },
    {
      medicineId: 21,
      medicineName: 'Clorpheniramin maleat',
      unit: 'viên',
      price: 15000,
      quantity: 500,
    },
    {
      medicineId: 22,
      medicineName: 'Dexamethason',
      unit: 'viên',
      price: 21000,
      quantity: 500,
    },
    {
      medicineId: 23,
      medicineName: 'Methylprednisolon',
      unit: 'ống',
      price: 11000,
      quantity: 500,
    },
    {
      medicineId: 24,
      medicineName: 'Prednisolon',
      unit: 'ống',
      price: 14000,
      quantity: 500,
    },
    {
      medicineId: 25,
      medicineName: 'Loratadin',
      unit: 'ống',
      price: 13000,
      quantity: 500,
    },
    {
      medicineId: 26,
      medicineName: 'Promethazin hydroclorid',
      unit: 'viên',
      price: 10000,
      quantity: 500,
    },
    {
      medicineId: 27,
      medicineName: 'Atropin sulfat ',
      unit: 'viên',
      price: 20000,
      quantity: 500,
    },
    {
      medicineId: 28,
      medicineName: 'Deferoxamin mesylat',
      unit: 'viên',
      price: 9000,
      quantity: 500,
    },
    {
      medicineId: 29,
      medicineName: 'Dimercaprol',
      unit: 'viên',
      price: 15000,
      quantity: 500,
    },
    {
      medicineId: 30,
      medicineName: 'Methionin',
      unit: 'bịch',
      price: 16000,
      quantity: 500,
    },
  ],
};

const PrescriptionModal = ({ isOpen, toggle, onSubmit, className, size, model, onCancel }) => {
  const [errors, setErrors] = useState([]);
  const [qtySelect, setQtySelect] = useState(Number.MAX_VALUE);

  const options = fakeMedicines.items.map((item) => ({
    value: item.medicineId,
    label: item.medicineName,
  }));

  let selectedMedicine = null;
  if (model) {
    selectedMedicine = options.find((item) => item.value === model.medicineId);
  }
  const getQtySelectedMedicine = (option) => {
    const medicine = fakeMedicines.items.find((item) => item.medicineId === option.value);
    if (!medicine) return;
    setQtySelect(medicine.quantity);
  };

  const cancelModal = () => {
    if (model) onCancel();
    toggle();
  };
  const handleSubmit = (event, values) => {
    console.log(values);
    const medicine = fakeMedicines.items.find((item) => item.medicineId === values.medicineId);
    onSubmit({ ...values, medicineName: medicine.medicineName });
  };

  return (
    <Modal isOpen={isOpen} toggle={cancelModal} className={className} size={size}>
      <ModalHeader toggle={toggle}>Thêm chi tiết đơn thuốc</ModalHeader>
      <AvForm onInvalidSubmit={(event, errors, values) => setErrors(errors)} onValidSubmit={handleSubmit} model={model}>
        <ModalBody>
          <AVSelect
            name="medicineId"
            label="Thuốc"
            placeholder="Chọn thuốc cần thêm"
            defaultValue={selectedMedicine}
            error={errors.indexOf('medicineId') !== -1}
            onChangeCallback={getQtySelectedMedicine}
            options={options}
            errorMessage={'Vui lòng chọn thuốc muốn thêm'}
          />

          <AvField
            name="quantity"
            label="Số lượng"
            type="number"
            validate={{
              required: { value: true, errorMessage: 'Số lượng thuốc là bắt buộc' },
              min: { value: 1, errorMessage: 'Số lượng thuốc tối thiểu là một' },

              max: {
                value: qtySelect,
                errorMessage: 'Số lượng thuốc không đủ vui lòng giảm số lượng hoặc dùng thuốc khác',
              },
            }}
          />

          <AvField
            name="instruction"
            label="Cách sử dụng"
            type="text"
            validate={{
              required: { value: true, errorMessage: 'Cách dùng thuốc là bắt buộc' },
              minLength: { value: 4, errorMessage: 'Cách dùng phải có độ dài ít nhất 4 ký tự' },
              maxLength: {
                value: 200,
              },
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Thêm đăng ký
          </Button>
          <Button color="secondary" className="ml-1" onClick={cancelModal}>
            Hủy bỏ
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};

export default PrescriptionModal;
