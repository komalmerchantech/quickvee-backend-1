import { Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const AddressForm = ({ infoRecord, onChangeHandle }) => {
  return (
    <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className="info-menu">Address</h1>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <BasicTextFields
              type={"text"}
              name={"address_1"}
              placeholder="Address Line1"
              value={infoRecord.address_1}
              onChangeFun={onChangeHandle}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={12}>
            <BasicTextFields
              type="text"
              name="address_2"
              placeholder="Address Line2"
              value={infoRecord.address_2}
              onChangeFun={onChangeHandle}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              className="store-info"
              type="text"
              name="city"
              placeholder="City"
              value={infoRecord.city}
              onChangeFun={onChangeHandle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="zip"
              placeholder="zip"
              value={infoRecord.zip}
              onChangeFun={onChangeHandle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="state"
              placeholder="State"
              value={infoRecord.state}
              onChangeFun={onChangeHandle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              type="text"
              name="phone"
              placeholder="Phone"
              value={infoRecord.phone}
              maxLength={10}
              onChangeFun={onChangeHandle}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressForm;
