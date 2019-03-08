import React from 'react';
import { Picker } from 'react-native';

const Select = ({ array, label, setSelectChange, value, tipo, turno, color }) => (
    <Picker
        selectedValue={value}
        style={[{ width: '100%' }, color ? { color: '#000' } : { color: '#fff' }]}
        onValueChange={(itemValue, itemIndex) => setSelectChange(itemValue, itemIndex - 1)}>
        <Picker.Item label={label} value={null} />
        {array.map(item => {
            if (turno) {
                return (
                    <Picker.Item key={item} label={item.label} value={item.id} />
                )
            } else {
                return (
                    <Picker.Item key={item} label={tipo === 'fornecedor' ? item.fantasia : item.nome} value={item.id} />
                )
            }
        })}
    </Picker>
)

export default Select;