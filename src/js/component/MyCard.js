import React, { useState } from "react";
import PropTypes from "prop-types";

import { MyItem } from "./MyItem";

import { Card, Form, ListGroup } from "react-bootstrap";

function MyCard() {
	let [list, setList] = useState([]);
	let [idCounter, setIdCounter] = useState(1);

	function handleKeyDown(e) {
		if (e.key != "Enter") return null;

		let auxElement = {
			id: `e-${idCounter}`,
			value: e.target.value
		};
		let auxList = [...list];
		auxList.push(auxElement);

		let auxIdCounter = idCounter;
		auxIdCounter++;

		setList(auxList);
		setIdCounter(auxIdCounter);
	}

	function handleClick(id) {
		let auxList = list.filter(element => element.id != id);
		setList(auxList);
	}

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
					{list.map(element => {
						return (
							<MyItem
								key={element.id}
								id={element.id}
								element={element.value}
								func={handleClick}
							/>
						);
					})}
				</ListGroup>
				<Card.Footer className="text-muted p-2">
					{list.length} item left
				</Card.Footer>
			</Card>
			<div className="paperDesign border-top-0" id="design1"></div>
			<div className="paperDesign border-top-0" id="design2"></div>
		</>
	);
}

MyCard.propTypes = {};

export { MyCard };
