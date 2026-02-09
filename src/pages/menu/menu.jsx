import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
	GreenDot,
	RingBlack,
	RingRed,
	Swoosh
} from 'assets/menu';
import { menuData } from 'data/menu/menuData';
import { MenuCategory } from './menuCategory/menuCategory';
import { MenuItemCarouselModal } from './menuItemCarouselModal/menuItemCarouselModal';
import Styles from './menu.module.scss';

const MotionImage = ({
	src, alt, className, animation
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<motion.img
			ref={ref}
			src={src}
			alt={alt}
			className={className}
			initial={{ opacity: 0, rotate: 0, ...animation.initial }}
			animate={
				isInView
					? { opacity: 1, rotate: 0, ...animation.animate }
					: {}
			}
			transition={{ duration: 0.8, ease: 'easeOut' }}
		/>
	);
};

const Menu = () => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([]);
	const [startIndex, setStartIndex] = useState(0);

	const handleItemClick = (categoryItems, index) => {
		const allItems = menuData.flatMap((cat) => cat.menuItems);
		const clickedItem = categoryItems[index];
		const globalIndex = allItems.indexOf(clickedItem);

		setItems(allItems);
		setStartIndex(globalIndex);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={Styles.menuContainer}>
			{menuData.map((category, index) => (
				<div className='menu position-relative' key={category.id}>
					{category.id === 'sandosBurgers' && (
						<MotionImage
							className={Styles.blackRing}
							src={RingBlack}
							alt='black ring'
							animation={{
								initial: { rotate: 180 },
								animate: { rotate: 0 }
							}}
						/>
					)}
					{category.id === 'sandosBurgers' && (
						<MotionImage
							className={Styles.greenDot}
							src={GreenDot}
							alt='green dot'
							animation={{ initial: { y: 10 }, animate: { y: 0 } }}
						/>
					)}
					{category.id === 'drinksBeverages' && (
						<MotionImage
							className={Styles.redRing}
							src={RingRed}
							alt='red ring'
							animation={{ initial: { rotate: -20 }, animate: { rotate: 0 } }}
						/>
					)}
					<MenuCategory
						id={category.id}
						description={category.description}
						heading={category.heading}
						menuItems={category.menuItems}
						onItemClick={handleItemClick}
					/>
					{index === menuData.length - 1 && <img className={Styles.swoosh} src={Swoosh} alt='purple swoosh' />}
				</div>
			))}
			<AnimatePresence>
				{open && (
					<MenuItemCarouselModal
						key="carousel-modal"
						onClose={handleClose}
						items={items}
						startIndex={startIndex}
						setStartIndex={setStartIndex}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Menu;
