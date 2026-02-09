import { motion } from 'framer-motion';
import { MenuItem } from '../menuItem/menuItem';
import Styles from './menuCategory.module.scss';

export const MenuCategory = ({
	id,
	description,
	heading,
	menuItems,
	onItemClick
}) => {
	const imageVariant = {
		hidden: { opacity: 0, x: -25 },
		show: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const containerVariants = {
		show: {
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.6,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 25 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.75, ease: 'easeOut' },
		},
	};

	return (
		<div className={`${Styles.container} menu-category`}>
			<motion.div
				className={Styles.headingContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.3 }}
				variants={imageVariant}
			>
				<img className={`${Styles.menuHeading} ${Styles[id]}`} src={heading} alt="" />
			</motion.div>
			<motion.div
				className="d-flex flex-column mt-5 gap-5 w-100"
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.3 }}
			>
				{description && (
					<motion.p className={Styles.description} variants={itemVariants}>
						{description}
					</motion.p>
				)}
				{menuItems.map((item, index) => (
					<motion.div key={index} variants={itemVariants}>
						<MenuItem {...item} onClick={() => onItemClick(menuItems, index)}/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
