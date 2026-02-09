import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ReactComponent as Background } from 'assets/home/Background.svg';
import Styles from './heroSection.module.scss';

const circlSplashTargets = [
	{ circleFill: '#A5001E', splashFill: '#BE0023', dotFill: '#760404' },
	{ circleFill: '#0D084B', splashFill: '#151063', dotFill: '#040F4B' }
];

export const HeroBackground = () => {
	const svgRef = useRef(null);

	useEffect(() => {
		const paths = svgRef.current.querySelectorAll('path');

		const masterTimeline = gsap.timeline();

		paths.forEach((path, index) => {
			const fillColor = path.getAttribute('fill');
			const splashTarget = circlSplashTargets.find((target) => target.circleFill === fillColor);

			if (!splashTarget) return;

			const pathId = `path-${index}`;
			const maskId = `mask-${index}`;

			path.setAttribute('id', pathId);

			const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');

			mask.setAttribute('id', maskId);

			const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

			rect.setAttribute('width', '100%');
			rect.setAttribute('height', '100%');
			rect.setAttribute('fill', 'black');

			mask.appendChild(rect);

			const bbox = path.getBBox();
			const cx = bbox.x + bbox.width / 2;
			const cy = bbox.y + bbox.height / 2;
			const radius = Math.max(bbox.width, bbox.height) / 2 + 20;

			const rotation = fillColor === '#A5001E' ? 180 : 195;

			const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

			circle.setAttribute('transform', `rotate(${rotation} ${cx} ${cy})`);
			circle.setAttribute('cx', cx);
			circle.setAttribute('cy', cy);
			circle.setAttribute('r', radius);
			circle.setAttribute('fill', 'none');
			circle.setAttribute('stroke', '#fff');
			circle.setAttribute('stroke-width', radius * 2);
			circle.setAttribute('stroke-dasharray', `0 ${(2 * Math.PI * radius).toFixed(2)}`);

			mask.appendChild(circle);
			svgRef.current.appendChild(mask);
			path.setAttribute('mask', `url(#${maskId})`);

			const circleTimeline = gsap.timeline();

			circleTimeline.to(circle, {
				strokeDasharray: `${(2 * Math.PI * radius).toFixed(2)} ${(2 * Math.PI * radius).toFixed(1)}`,
				duration: 0.6,
				ease: 'power1.inOut',
			}, 0);

			const splashPaths = Array.from(paths).filter((p) => p.getAttribute('fill') === splashTarget.splashFill);

			const splashWithAngles = splashPaths.map((sp) => {
				const bbox = sp.getBBox();
				const sx = bbox.x + bbox.width / 2;
				const sy = bbox.y + bbox.height / 2;
				const angle = Math.atan2(sy - cy, sx - cx) * (180 / Math.PI);
				const angleDiff = ((angle - rotation + 360) % 360);

				return { path: sp, angleDiff };
			});

			splashWithAngles
				.sort((a, b) => a.angleDiff - b.angleDiff)
				.forEach(({ path: splashPath }, i) => {
					const delay = (i / splashWithAngles.length) * 0.5;

					const splashTimeline = gsap.timeline();

					splashTimeline.fromTo(
						splashPath,
						{
							scaleX: 0.3,
							scaleY: 0.3,
							opacity: 0,
							transformOrigin: 'center center',
						},
						{
							scaleX: 1.05,
							scaleY: 0.9,
							opacity: 1,
							duration: 0.5,
							ease: 'power2.out',
						}
					).to(splashPath, {
						scaleX: 1,
						scaleY: 1,
						duration: 0.3,
						ease: 'elastic.out(1, 0.4)',
					});

					circleTimeline.add(splashTimeline, delay);
				});

			const dotPaths = Array.from(paths).filter((p) => p.getAttribute('fill') === splashTarget.dotFill);

			dotPaths.forEach((dotPath) => {
				const dotAppearTimeline = gsap.timeline();

				dotAppearTimeline.fromTo(
					dotPath,
					{
						scale: 0.45,
						opacity: 0,
						transformOrigin: 'center center',
					},
					{
						scale: 0.49,
						opacity: 1,
						duration: splashTarget.dotFill === '#760404' ? 0.15 : 0.009,
						ease: 'bounce.out(10)',
					}
				).to(dotPath, {
					scale: 1,
					duration: 0.05,
					ease: 'power3.out(18)',
				});

				circleTimeline.add(dotAppearTimeline, 1);
			});

			masterTimeline.add(circleTimeline, '+=0.001');
		});
	}, []);

	return (
		<Background ref={svgRef} className={Styles.backgroundImage} />
	);
};
