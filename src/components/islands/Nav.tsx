import { createElement, useEffect, useState } from 'react';
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
	IconMoon,
	IconSun,
} from '@tabler/icons-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Dock, DockIcon } from './Dock';
import { PROFILE, localePath, useTranslations, type Locale } from '@/i18n/ui';

type Theme = 'light' | 'dark';

type NavProps = {
	locale: Locale;
	/** URL of the same page in the other locale */
	alternateHref: string;
};

const itemClass =
	'hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 group';
const tooltipClass =
	'rounded-2xl text-sm px-2 p-0.5 mb-2 bg-popover-foreground text-popover';
const separator = (
	<div role="none" className="shrink-0 bg-border w-[1px] h-8" />
);

const items = [
	{
		name: PROFILE.github,
		link: PROFILE.githubLink,
		icon: IconBrandGithub,
		brandName: 'GitHub',
	},
	{
		name: PROFILE.linkdin,
		link: PROFILE.linkdinLink,
		icon: IconBrandLinkedin,
		brandName: 'LinkedIn',
	},
	...(PROFILE.mail
		? [
				{
					name: PROFILE.mail,
					link: `mailto:${PROFILE.mail}`,
					icon: IconMail,
					brandName: 'Email',
				},
			]
		: []),
];

export default function Nav({ locale, alternateHref }: NavProps) {
	// Real theme is only known client-side (set by the inline script in <head>)
	const [theme, setTheme] = useState<Theme>('light');
	useEffect(() => {
		setTheme(
			document.documentElement.classList.contains('dark') ? 'dark' : 'light',
		);
	}, []);

	const toggleTheme = () => {
		const next: Theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', next === 'dark');
		document.documentElement.style.colorScheme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			/* storage unavailable */
		}
		setTheme(next);
	};

	const themeLabel = theme === 'dark' ? 'Light' : 'Dark';
	const localLabel = locale === 'en' ? 'Français' : 'English';
	const homeLabel = useTranslations(locale).nav.home;

	return (
		<TooltipProvider delayDuration={100}>
			<nav aria-label="Main">
				<Dock
					direction="middle"
					className={
						'fixed z-[200] inset-0 top-auto bottom-10 mx-auto animate-dock-slide-in'
					}
				>
					<DockIcon className={itemClass}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									href={`${localePath(locale)}#about`}
									aria-label={homeLabel}
									className={
										'group-hover:scale-[1.3] transition duration-300 flex flex-col items-center'
									}
								>
									<LogoMark className={'w-6 h-5'} />
									<p className={'text-xs md:hidden mt-1'}>{homeLabel}</p>
								</a>
							</TooltipTrigger>
							<TooltipContent
								side="top"
								align="center"
								className={tooltipClass}
							>
								{homeLabel}
							</TooltipContent>
						</Tooltip>
					</DockIcon>
					{separator}
					<DockIcon className={itemClass}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									href={alternateHref}
									hrefLang={locale === 'en' ? 'fr' : 'en'}
									aria-label={localLabel}
									className={
										'group-hover:scale-[1.3] transition duration-300 flex flex-col items-center'
									}
								>
									{locale === 'fr' ? (
										<Baguette
											className={
												'group-hover:rotate-90 transition duration-300 size-8 '
											}
										/>
									) : (
										<Tea className={'size-6'} />
									)}
									<p className={'text-xs md:hidden mt-1'}>{localLabel}</p>
								</a>
							</TooltipTrigger>
							<TooltipContent
								side="top"
								align="center"
								className={tooltipClass}
							>
								{locale === 'en' ? 'English' : 'Français'}
							</TooltipContent>
						</Tooltip>
					</DockIcon>
					{separator}
					{items.map((item, index) => (
						<DockIcon key={index} className={itemClass}>
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href={item.link}
										target={'_blank'}
										rel="noopener noreferrer"
										title={item.brandName}
										className={
											'group-hover:scale-[1.3] transition size-full flex flex-col items-center justify-center'
										}
									>
										<div className={'flex flex-col items-center'}>
											{createElement(item.icon, {
												size: 24,
												title: item.brandName,
											})}
											<p className={'text-xs md:hidden mt-1'}>
												{item.brandName}
											</p>
										</div>
									</a>
								</TooltipTrigger>
								<TooltipContent
									side="top"
									align="center"
									className={tooltipClass}
								>
									{item.brandName}
								</TooltipContent>
							</Tooltip>
						</DockIcon>
					))}
					{separator}
					<DockIcon className={itemClass}>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									aria-label={themeLabel}
									className={
										'group-hover:scale-[1.3] transition flex flex-col items-center justify-between'
									}
									onClick={toggleTheme}
								>
									{/* Only the icon rotates, not the mobile label */}
									<span className={'transition group-hover:rotate-45'}>
										{theme === 'dark' ? (
											<IconMoon size={24} />
										) : (
											<IconSun size={24} />
										)}
									</span>
									<p className={'text-xs md:hidden mt-1'}>{themeLabel}</p>
								</button>
							</TooltipTrigger>
							<TooltipContent
								side="top"
								align="center"
								className={tooltipClass}
							>
								{themeLabel}
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				</Dock>
			</nav>
		</TooltipProvider>
	);
}

/** Thickened cut of the logo (logo/final/svg/tlf-tile-small.svg), required below 48 px */
function LogoMark({ className }: { className: string }) {
	return (
		<svg
			className={`overflow-visible logo-loop ${className}`}
			viewBox="8 32 240 196"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<g transform="translate(-6 0)">
				<g
					fill="none"
					stroke="currentColor"
					strokeWidth="32"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path pathLength={1} d="M30 48H118" />
					<path pathLength={1} d="M74 48V176A36 36 0 0 0 110 212H124" />
					<path pathLength={1} d="M220 48H206A38 38 0 0 0 168 86V212" />
					<path pathLength={1} d="M144 124H214" />
				</g>
				<rect
					className="logo-cursor"
					x="198"
					y="196"
					width="52"
					height="32"
					rx="4"
					fill="currentColor"
				/>
			</g>
		</svg>
	);
}

function Baguette({ className }: { className: string }) {
	return (
		<svg
			className={className}
			width="100px"
			height="100px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				className={'stroke-black dark:stroke-white'}
				d="M13.1798 7.13997L13.4663 6.85418C13.6103 6.7102 13.7606 6.57547 13.9164 6.45009C14.7365 6.36455 15.4824 6.50347 16.57 6.86888M10.3894 9.9304L10.6759 9.64461C10.8198 9.50063 10.9701 9.3659 11.126 9.24052C11.9461 9.15498 12.692 9.2939 13.7796 9.65932M7.59892 12.7208L7.88542 12.435C8.0294 12.2911 8.1797 12.1563 8.33552 12.031C9.15567 11.9454 9.90155 12.0843 10.9891 12.4497M4.80886 15.5116L5.09499 15.2255C5.23876 15.0817 5.38884 14.9471 5.54443 14.8219C6.36458 14.7357 7.11064 14.8746 8.19871 15.2402M20.0459 3.78249C21.0223 4.7588 21.0223 6.34171 20.0459 7.31802L7.31802 20.0459C6.34171 21.0223 4.7588 21.0223 3.78249 20.0459C2.80618 19.0696 2.80618 17.4867 3.78249 16.5104L16.5104 3.78249C17.4867 2.80618 19.0696 2.80618 20.0459 3.78249Z"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function Tea({ className }: { className: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width="800px"
			height="800px"
			fill="#000000"
			aria-hidden="true"
		>
			<g className={'fill-black dark:fill-white'}>
				<path d="M507.346,80.023c-4.514-10.646-11.982-19.632-21.419-26.01c-9.408-6.37-20.911-10.118-33.091-10.118h-38.294 h-21.334h-1.294H60.613c-6.856,0-13.501,1.406-19.513,3.952c-9.022,3.825-16.63,10.147-22.03,18.128 c-5.4,7.974-8.579,17.74-8.565,28.035v93.732c-0.007,27.831,5.654,54.46,15.877,78.642c15.357,36.283,40.945,67.082,73.171,88.858 c32.219,21.777,71.209,34.525,112.97,34.511c27.832,0.007,54.467-5.646,78.642-15.877c36.284-15.357,67.082-40.945,88.866-73.171 c4.177-6.181,8.016-12.622,11.51-19.281c0.556,0.014,1.105,0.056,1.667,0.056c16.341,0.007,32.022-3.326,46.246-9.345 c21.356-9.036,39.441-24.062,52.245-43.012c12.804-18.929,20.314-41.909,20.3-66.428c0-18.268,0-33.168,0-43.512 c0-10.344,0-16.11,0-16.11C512,94.951,510.341,87.111,507.346,80.023z M369.286,187.741c0,21.706-4.381,42.267-12.306,61.013 c-11.882,28.099-31.797,52.083-56.822,68.995c-25.053,16.896-55.092,26.741-87.635,26.755c-21.706,0-42.274-4.381-61.013-12.313 c-28.105-11.876-52.083-31.79-68.994-56.815c-16.912-25.054-26.755-55.093-26.755-87.635V94.009c0-0.724,0.126-1.315,0.365-1.877 c0.352-0.844,0.998-1.632,1.786-2.159c0.801-0.528,1.617-0.809,2.7-0.823h185.832v42.513l-38.28,34.659l1.083-0.978 c-6.835,6.188-10.73,14.978-10.73,24.204v41.177c-0.014,8.965,3.678,17.235,9.563,23.092c5.857,5.886,14.119,9.577,23.092,9.564 h64.016c8.972,0.014,17.235-3.678,23.092-9.564c5.886-5.857,9.577-14.126,9.564-23.092v-41.177c0-9.226-3.895-18.016-10.731-24.204 l-38.35-34.736V89.15h90.524V187.741z M263.18,160.113l32.233,29.181l0.112,0.254v41.177l-0.099,0.232l-0.239,0.099h-64.016 l-0.239-0.099l-0.092-0.232v-41.177l0.112-0.254L263.18,160.113z M466.745,119.182c0,10.343,0,25.244,0,43.512 c0,10.21-2.054,19.836-5.766,28.612c-5.569,13.17-14.921,24.442-26.664,32.374c-7.566,5.098-16.068,8.797-25.23,10.808 c3.558-15.02,5.457-30.672,5.457-46.746V89.15h38.294c1.983,0.014,3.755,0.394,5.415,1.083c2.461,1.04,4.627,2.834,6.132,5.062 c1.504,2.25,2.356,4.803,2.363,7.763C466.745,103.058,466.745,108.839,466.745,119.182z" />
				<rect x="0" y="422.857" width="425.048" height="45.248" />
			</g>
		</svg>
	);
}
