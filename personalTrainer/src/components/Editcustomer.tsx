import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { Customer, CustomerData } from "../types";

type EditCustomerProps = {
	data: CustomerData;
	fetchCustomers: () => void;
}

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
		})
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
			body: JSON.stringify(customer)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Error while updating customer");
				}
				return response.json();
			})
			.then(() => props.fetchCustomers())
			.then(() => handleClose())
			.catch(err => console.error(err));
	}

	return (
		<>
			<Button variant="outlined" onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Update Customer</DialogTitle>
				<DialogContent>
					<TextField
						required
						margin="dense"
						name="firstname"
						value={customer.firstname}
						onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
						label="firstname"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="lastname"
						value={customer.lastname}
						onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
						label="lastname"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="email"
						value={customer.email}
						onChange={event => setCustomer({ ...customer, email: event.target.value })}
						label="email"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="phone"
						value={customer.phone}
						onChange={event => setCustomer({ ...customer, phone: event.target.value })}
						label="phone"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="streetaddress"
						value={customer.streetaddress}
						onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
						label="streetaddress"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="postcode"
						value={customer.postcode}
						onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
						label="postcode"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="city"
						value={customer.city}
						onChange={event => setCustomer({ ...customer, city: event.target.value })}
						label="city"
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
	)
}
