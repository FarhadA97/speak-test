import Styles from './menuItem.module.scss';

export const MenuItem = ({
	title,
	price,
	description,
	onClick
}) => {
	return (
		<a
			href="#item"
			className={`${Styles.itemCard} menu-item`}
			onClick={(e) => { e.preventDefault(); onClick(); }}
		>
			<div className='d-flex justify-content-between w-100'>
				<p className={Styles.itemHeading}>{title}</p>
				<p className={Styles.itemPrice}>{price}</p>
			</div>
			<p className={Styles.itemDescription}>{description}</p>
		</a>
	);
};
