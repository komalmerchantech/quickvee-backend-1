import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

export default function BasicTextFields({
  value,
  maxLength,
  onChangeFun,
  type,
  placeholder,
  readOnly,
  required,
  name,
  disable,
  onBlurFunction,
}) {
  return (
    <FormControl fullWidth>
      <TextField
        id="outlined-basic"
        sx={{fontFamily: "inherit"}}
        name={name}
        value={value}
        inputProps={{ maxLength: maxLength, type: type, readOnly: readOnly }}
        onChange={onChangeFun}
        placeholder={placeholder}
        required={required}
        variant="outlined"
        size="small"
        disabled={disable}
        onBlur={onBlurFunction}
      />
    </FormControl>
  );
}
