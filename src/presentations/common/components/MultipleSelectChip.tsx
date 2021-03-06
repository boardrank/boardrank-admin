import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Item {
  value: string;
  label?: string;
}

interface MultipleSelectChipProps<T extends Item> {
  label: string;
  items: T[];
  value: string[];
  onChange?: (value: string[]) => void;
}

function MultipleSelectChip<T extends Item>({
  label,
  items,
  value,
  onChange,
}: MultipleSelectChipProps<T>) {
  const handleChange = useCallback(
    ({ target: { value } }: SelectChangeEvent<string[]>) => {
      if (typeof value !== 'string') {
        if (onChange) onChange(value);
      }
    },
    [onChange],
  );

  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel id={`label-multiple-${label}`}>{label || 'label'}</InputLabel>
      <Select
        labelId={`label-multiple-${label}`}
        id={`multiple-${label}`}
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput id={`multiple-${label}`} label="Chip" />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => {
              const item = items.find(item => item.value === value) as T;
              return <Chip key={value} label={item.label || value} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {items.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label || value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelectChip;
