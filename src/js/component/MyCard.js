import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MyItem } from "./MyItem";

import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Form,
	ListGroup
} from "react-bootstrap";

function MyCard() {
	let [list, setList] = useState([]);

	const user = "DaniilTorpedoKvyat";
	const baseUrl = "https://assets.breatheco.de/apis/fake/todos/user/" + user;

	async function createUser() {
		// Create the user if the "getListFromAPI" return a response with status 404
		await (async () => {
			try {
				const response = await fetch(baseUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([])
				});
			} catch (error) {
				return null;
			}
		})();
	}

	async function fetchTodosList() {
		// Fetch with a GET method the Todos list from the API
		const response = await fetch(baseUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response;
	}

	async function getListFromAPI() {
		// If the user exist fetch the List of Todos from the API
		// else the user does not exist create it and get the List of Todos
		try {
			const response = await fetchTodosList();

			if (response.ok) {
				const body = await response.json();
				setList(body);
			} else {
				await createUser();
				const response = await fetchTodosList();
				const body = await response.json();
				setList(body);
			}
		} catch (error) {
			return null;
		}
	}

	async function updateInfoInAPI(auxList) {
		// fetch the List of Todos to the API with the PUT method
		try {
			const response = await fetch(baseUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(auxList)
			});
			if (response.ok) {
				getListFromAPI();
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
	}

	function handleKeyDown(e) {
		if (
			e.key != "Enter" ||
			/^\s+$/g.test(e.target.value) ||
			e.target.value == ""
		) {
			return null;
		}

		// When user click Enter, add a new Todo to an auxList to be fetch to the API
		// {
		//		label: e.target.value,
		//		done: false
		// }

		let newTodo = {
			label: e.target.value,
			done: false
		};

		let auxList = [...list];
		auxList.push(newTodo);

		updateInfoInAPI(auxList);

		e.target.value = "";
	}

	function handleClickDelete(id) {
		// Delete the element from the list to be fetch, if the list end empty it fetch a new one with only one task
		let auxList = list.filter((element, index) => index != id);
		if (!auxList.length) {
			auxList.push({ label: "sample task", done: false });
		}

		updateInfoInAPI(auxList);
	}

	function handleClickDeleteAll() {
		// Create a new list with only one task to be fetch to the API
		updateInfoInAPI([{ label: "sample task", done: false }]);
	}

	useEffect(() => {
		// Working as "ComponentDidMount" when the list is empty
		getListFromAPI();
	}, []);

	return (
		<>
			<Card className="m-auto boxShadowCard" style={{ width: "30rem" }}>
				<Card.Body>
					<Form.Group className="m-0">
						<Form.Control
							onKeyDownCapture={handleKeyDown}
							type="text"
							placeholder={
								!list.length ? "No tasks, add a task" : ""
							}
						/>
					</Form.Group>
				</Card.Body>
				<ListGroup variant="flush">
					{list.map((element, index) => {
						return (
							<MyItem
								key={index}
								id={index}
								element={element.label}
								handlerDelete={handleClickDelete}
							/>
						);
					})}
				</ListGroup>
				<Card.Footer className="text-muted p-2">
					<Container fluid>
						<Row className="">
							<Col md={"auto"}>
								<p className="m-0">{list.length} item left</p>
							</Col>
							<Col md={"auto"} className="ml-auto">
								<Button
									variant="danger"
									onClick={handleClickDeleteAll}>
									Delete All
								</Button>
							</Col>
						</Row>
					</Container>
				</Card.Footer>
			</Card>
			<div className="paperDesign border-top-0" id="design1"></div>
			<div className="paperDesign border-top-0" id="design2"></div>
		</>
	);
}

export { MyCard };
