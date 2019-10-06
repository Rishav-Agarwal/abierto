import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdFavorite } from 'react-icons/md';

class Footer extends Component {
	render() {
		return (
			<footer className="footer d-flex flex-row flex-wrap align-items-center p-2">
				<p className="col-12 col-sm-7 text-center m-0">
					Made with <MdFavorite style={{ color: 'red' }} /> by Rishav Agarwal in
					India
				</p>

				{/* Github and social media handles */}
				<div className="d-flex justify-content-center col-12 col-sm-5 w-75">
					{/* Display tooltip when hovered */}

					{/* Github */}
					<OverlayTrigger overlay={<Tooltip>Github</Tooltip>}>
						{/* rel="noreferrer noopener" is used for security reasons.
              See https://mathiasbynens.github.io/rel-noopener/ for details */}
						<a
							href="https://github.com/Rishav-Agarwal"
							target="_blank"
							rel="noreferrer noopener"
						>
							<i className="fab fa-github mx-2 mx-md-3"></i>
						</a>
					</OverlayTrigger>

					{/* Twitter */}
					<OverlayTrigger overlay={<Tooltip>Twitter</Tooltip>}>
						<a
							href="https://twitter.com/MrRedible"
							target="_blank"
							rel="noreferrer noopener"
						>
							<i className="fab fa-twitter mx-2 mx-md-3"></i>
						</a>
					</OverlayTrigger>

					{/* Linkedin */}
					<OverlayTrigger overlay={<Tooltip>Linkedin</Tooltip>}>
						<a
							href="https://www.linkedin.com/in/mr-redible/"
							target="_blank"
							rel="noreferrer noopener"
						>
							<i className="fab fa-linkedin mx-2 mx-md-3"></i>
						</a>
					</OverlayTrigger>

					{/* Facebook */}
					<OverlayTrigger overlay={<Tooltip>Facebook</Tooltip>}>
						<a
							href="https://www.facebook.com/rishav.agarwal97"
							target="_blank"
							rel="noreferrer noopener"
						>
							<i className="fab fa-facebook mx-2 mx-md-3"></i>
						</a>
					</OverlayTrigger>
				</div>
			</footer>
		);
	}
}

export default Footer;
