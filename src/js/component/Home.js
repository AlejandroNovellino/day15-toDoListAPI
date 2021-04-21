import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { MyCard } from "./MyCard";

//create your first component
export function Home() {
	return (
		<Container fluid className="background">
			<Row>
				<Col>
					<h1 className="display-1 text-center titleColor">todos</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<MyCard />
				</Col>
			</Row>
		</Container>
	);
}
