import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { func, number, string } from 'prop-types';

export default function AsyncSelect({ label, id, getOptions, changeHandler, index = 0, ...otherProps }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await getOptions();

      const optionsData = Object.entries(data)
        .filter(item => item[1].quantity > 0)
        .map(item => ({ ...item[1], title: `${item[1].item} - ${item[1].color}`, id: item[0] }));

      if (active) {
        setOptions([...optionsData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, newValue) => changeHandler(e, newValue, index)}
      // isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={option => (option?.title ? option?.title : '')}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      {...otherProps}
    />
  );
}

AsyncSelect.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
  label: string.isRequired,
  getOptions: func.isRequired,
  changeHandler: func.isRequired
};
