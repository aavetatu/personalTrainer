import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Customer, CustomerData } from "../types";

type EditCustomerProps = {
  data: CustomerData;
  fetchCustomers: () => void;
};

export default function Addcustomer(props: EditCustomerProps) {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      email: props.data.email,
      phone: props.data.phone,
      streetaddress: props.data.streetaddress,
      postcode: props.data.postcode,
      city: props.data.city,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    fetch(props.data._links.self.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while updating customer");
        }
        return response.json();
      })
      .then(() => props.fetchCustomers())
      .then(() => handleClose())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={(e) =>
              setCustomer({ ...customer, firstname: e.target.value })
            }
            label="Firstname"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={(e) =>
              setCustomer({ ...customer, lastname: e.target.value })
            }
            label="Lastname"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            label="Phone"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(e) =>
              setCustomer({ ...customer, streetaddress: e.target.value })
            }
            label="Streetaddress"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={(e) =>
              setCustomer({ ...customer, postcode: e.target.value })
            }
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="city"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            label="City"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
