import React from 'react';
import { motion } from 'framer-motion';
import { Cross, LeftArrow, RightArrow } from 'assets/menu';
import Styles from './menuItemCarouselModal.module.scss';

const INACTIVE_CARD_WIDTH = 200;
const ACTIVE_CARD_WIDTH = 550;
const DESIRED_SLOT = 1;

const InactiveCard = ({
	index,
	item,
	isActive,
	setStartIndex
}) => (
	<div
		className={Styles.modalCardContainer}
		style={{
			flex: 'none',
			width: `${isActive ? ACTIVE_CARD_WIDTH : INACTIVE_CARD_WIDTH}px`,
		}}
		onClick={() => setStartIndex(index)}
	>
		<img
			className={Styles.modalCardImage}
			src={item.image}
			alt={item.title}
		/>
		<div className={Styles.modalCardOverlay}>
			<h3 className={Styles.modalCardTitle}>{item.title}</h3>
			<p className={Styles.modalCardDescription}>{item.description}</p>
		</div>
	</div>
);

const ActiveCard = ({
	item,
	onClose,
	onPrev,
	onNext,
	hasPrev,
	hasNext
}) => (
	<div
		className={Styles.modalCardContainerSelected}
		style={{
			position: 'absolute',
			top: 0,
			left: `${DESIRED_SLOT * INACTIVE_CARD_WIDTH + (INACTIVE_CARD_WIDTH - ACTIVE_CARD_WIDTH) / 38}px`,
			width: `${ACTIVE_CARD_WIDTH}px`,
			backgroundColor: '#212121',
		}}
	>
		<button className={Styles.cross} onClick={onClose}>
			<img src={Cross} alt="Close" />
		</button>
		{hasPrev && (
			<button className={Styles.leftArrow} onClick={onPrev}>
				<img src={LeftArrow} alt="Prev" />
			</button>
		)}
		<img
			className={Styles.modalCardImageSelected}
			src={item.image}
			alt={item.title}
		/>
		{hasNext && (
			<button className={Styles.rightArrow} onClick={onNext}>
				<img src={RightArrow} alt="Next" />
			</button>
		)}
		<div className={Styles.modalCardOverlaySelected}>
			<h3 className={Styles.modalCardTitle}>{item.title}</h3>
			<p className={Styles.modalCardDescription}>{item.description}</p>
		</div>
	</div>
);

export const MenuItemCarouselModal = ({
	onClose,
	items,
	startIndex,
	setStartIndex
}) => {
	const shift = (startIndex - DESIRED_SLOT) * INACTIVE_CARD_WIDTH
		+ (INACTIVE_CARD_WIDTH - ACTIVE_CARD_WIDTH) / 32 + 20;

	const handlePrev = () => setStartIndex((i) => Math.max(i - 1, 0));
	const handleNext = () => setStartIndex((i) => Math.min(i + 1, items.length - 1));

	return (
		<div className={Styles.modalOverlay} onClick={onClose}>
			<motion.div
				className={Styles.modalContainer}
				onClick={(e) => e.stopPropagation()}
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
			>
				<div
					className={Styles.carouselTrack}
					style={{
						transform: `translateX(${-shift}px)`,
						transition: 'transform 0.4s ease-out',
					}}
				>
					{items.map((item, index) => (
						<InactiveCard
							key={index}
							index={index}
							item={item}
							isActive={index === startIndex}
							setStartIndex={setStartIndex}
						/>
					))}
				</div>

				<ActiveCard
					item={items[startIndex]}
					onClose={onClose}
					onPrev={handlePrev}
					onNext={handleNext}
					hasPrev={startIndex > 0}
					hasNext={startIndex < items.length - 1}
				/>
			</motion.div>
		</div>
	);
};
