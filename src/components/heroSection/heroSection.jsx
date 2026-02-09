import React from 'react';
import { Navbar } from 'components/navbar';
import { DoorKnocker } from 'components/doorKnocker';
import { HeroBackgroundVideo, LogoWithSlogan } from 'assets/home';
import Styles from './heroSection.module.scss';

export const HeroSection = () => {
	return (
		<section className={Styles.heroContainer}>
			<video
				className={Styles.video}
				autoPlay
				loop
				muted
				playsInline
			>
				<source src={HeroBackgroundVideo} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className={Styles.logoContainer}>
				<LogoWithSlogan />
			</div>
			<div className={Styles.overlay}>
				<Navbar />
			</div>
			<div className={Styles.doorKnockerContainer}>
				<DoorKnocker />
			</div>
		</section>
	);
};
