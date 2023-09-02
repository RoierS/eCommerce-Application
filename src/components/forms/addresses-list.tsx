import { IBaseAddress } from "@interfaces/registration-form-data";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, Button } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography/Typography";

import AddressDataForm from "./address-form";

import styles from "./forms.module.scss";

const AddressesList = (props: {
  addresses: IBaseAddress[];
  version: number;
  defaultAddressId: string;
  typography: string;
}) => {
  const { addresses, version, defaultAddressId, typography } = props;
  const listItems = addresses.map((address: IBaseAddress, index: number) => {
    return address && address?.id === defaultAddressId ? (
      <li className={styles.default} key={`${address.id}${address.postalCode}`}>
        <Typography
          className={styles.h4default}
          align="center"
          variant="subtitle2"
        >
          Address {index + 1} (default):
        </Typography>
        <AddressDataForm {...{ address, version }} />
      </li>
    ) : (
      <li className={styles.basic} key={`${address.id}${address.postalCode}`}>
        <Typography align="center" variant="subtitle2" color="primary">
          Address {index + 1}:
        </Typography>
        <AddressDataForm {...{ address, version }} />
      </li>
    );
  });

  const addAddress = () => {
    console.log("add Address");
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" variant="h6" color="primary">
          {typography}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul>{listItems}</ul>
        <Button
          type="button"
          variant="contained"
          color="info"
          onClick={addAddress}
        >
          Add address
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddressesList;
