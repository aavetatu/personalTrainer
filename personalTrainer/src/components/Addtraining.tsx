import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from "@mui/material";
import { data } from "react-router-dom";

type AddTrainingProps = {
	fetchTrainings: () => void;
};

type Customer = {
	firstname: string;
	lastname: string;
	_links: {
		self: {
			href: string;
		};
	};
};

export default function Addtraining(props: AddTrainingProps) {

	const [training, setTraining] = useState({
		date: "",
		duration: 0,
		activity: "",
		customer: "",
	});
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + "customers")
			.then(response => response.json())
			.then(data => setCustomers(data._embedded.customers))
			.catch(err => console.error("Error while fetching customers", err));
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		//		const newtraining = {
		//			date: new Date(training.date).toISOString(),
		//			duration: training.duration,
		//			activity: training.activity,
		//			customer: training.customer, // needs fixing, requires full URL
		//		};

		fetch(import.meta.env.VITE_API_URL + "trainings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(training)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Error while adding training");
				}
				return response.json();
			})
			.then(() => props.fetchTrainings())
			.then(() => handleClose())
			.catch(err => console.error(err));
	};

	return (
		<>
			<Button variant="outlined" onClick={handleClickOpen}>
				Add Training
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Add a new Training</DialogTitle>
				<DialogContent>
					<TextField
						required
						margin="dense"
						name="date"
						type="datetime-local"
						value={training.date}
						onChange={event => setTraining({ ...training, date: event.target.value })}
						label="date"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="duration"
						type="number"
						value={training.duration}
						onChange={event => setTraining({ ...training, duration: Number(event.target.value) })}
						label="duration"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={event => setTraining({ ...training, activity: event.target.value })}
						label="activity"
						fullWidth
						variant="standard"
					/>
					<TextField
						select
						required
						margin="dense"
						name="customer"
						value={training.customer}
						onChange={event => setTraining({ ...training, customer: event.target.value })}
						label="customer"
						fullWidth
						variant="standard"
					>{customers.map((customer, index) => (
						<MenuItem
							key={index}
							value={customer._links.self.href}>
							{customer.firstname} {customer.lastname}
						</MenuItem>
					))}
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
