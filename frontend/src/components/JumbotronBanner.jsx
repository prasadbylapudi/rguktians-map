import React from "react";
import {Jumbotron, Button} from "reactstrap";

const JumbotronBanner = () => {
	return (
		<div>
			<Jumbotron className="dark-jmode" >
				<h1 className="display-3">RGUKTians Map!</h1>
				<p className="student">
				A place for RGUKTians where we can find alumni and students  at one place. RGUKTians-Map displays the students of all batches on a map, where we can see their profiles, skills and current position. We provide filters such as branch, year and campus to find and connect with people in case of any need, or if we want to connect with any student at any time for any sort of help.
				</p>
				<hr className="my-2" />
				<p>
					RGUKT students and alumni can add themselves on the map, by completing a simple form provided below.
				</p>
				<p>Find your latitude, longitude using this <a href="https://www.latlong.net/convert-address-to-lat-long.html">link.</a> Cropping image into sqaured is recommended. You can achieve <a href="https://resizeimage.net/">here</a>  the same.</p>
			<form>
				{/* <Button color="primary" onClick={() => history.push('/student-form')}>Add yourself to map!</Button> */}
				<Button className="homebutton" color="primary" onClick={() => window.open('/student-form', '_blank')}>Add yourself to map!</Button>
			</form>
			
			</Jumbotron>
		</div>

	);
};

export default JumbotronBanner;
