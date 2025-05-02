import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { Training } from "../types";

type AddTrainingProps = {
	fetchTrainings: () => void;
}

export default function Addtraining(props: AddTrainingProps) {

	const [training, setTraining] = useState({
		date: "",
		duration: "",
		activity: "",
		customer: "",
	});

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		const newtraining = {
			date: new Date(training.date).toISOString(),
			duration: training.duration,
			activity: training.activity,
			customer: training.customer, // needs fixing, requires full URL
		};

		fetch(import.meta.env.VITE_API_URL + "trainings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newtraining)
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
						onChange={event => setTraining({ ...training, duration: event.target.value })}
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
						required
						margin="dense"
						name="customerName"
						value={training.customer}
						onChange={event => setTraining({ ...training, customer: event.target.value })}
						label="customer"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>

		</>
	)
}
