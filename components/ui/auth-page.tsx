'use client';

import React, { useState } from 'react';
import { Button } from './button';

import {
	AppleIcon,
	AtSignIcon,
	ChevronLeftIcon,
	GithubIcon,
} from 'lucide-react';
import { Input } from './input';
import { Globe } from './cobe-globe';
import Image from 'next/image';
import { Component as LanguageSelectorDropdown } from './language-selector-dropdown';
import { translations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const markers = [
	{ id: 'sf', location: [37.7595, -122.4367] as [number, number], label: 'San Francisco' },
	{ id: 'nyc', location: [40.7128, -74.006] as [number, number], label: 'New York' },
	{ id: 'tokyo', location: [35.6762, 139.6503] as [number, number], label: 'Tokyo' },
	{ id: 'london', location: [51.5074, -0.1278] as [number, number], label: 'London' },
	{ id: 'sydney', location: [-33.8688, 151.2093] as [number, number], label: 'Sydney' },
	{ id: 'capetown', location: [-33.9249, 18.4241] as [number, number], label: 'Cape Town' },
	{ id: 'dubai', location: [25.2048, 55.2708] as [number, number], label: 'Dubai' },
	{ id: 'paris', location: [48.8566, 2.3522] as [number, number], label: 'Paris' },
	{ id: 'saopaulo', location: [-23.5505, -46.6333] as [number, number], label: 'São Paulo' },
];

const arcs = [
	{
		id: 'sf-tokyo',
		from: [37.7595, -122.4367] as [number, number],
		to: [35.6762, 139.6503] as [number, number],
		label: 'SF → Tokyo',
	},
	{
		id: 'nyc-london',
		from: [40.7128, -74.006] as [number, number],
		to: [51.5074, -0.1278] as [number, number],
		label: 'NYC → London',
	},
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthPage() {
	const [lang, setLang] = useState('en');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [sentTo, setSentTo] = useState<string | null>(null);
	const t = translations[lang] ?? translations.en;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = email.trim();
		if (!EMAIL_RE.test(value)) {
			setEmailError(true);
			setSentTo(null);
			return;
		}
		setEmailError(false);
		setSentTo(value);
	};
	const linkClass = 'hover:text-primary underline underline-offset-4';
	const renderTerms = (text: string) =>
		text.split(/(\{tos\}|\{privacy\})/).map((part, i) => {
			if (part === '{tos}') {
				return (
					<a key={i} href="#" className={linkClass}>
						{t.tos}
					</a>
				);
			}
			if (part === '{privacy}') {
				return (
					<a key={i} href="#" className={linkClass}>
						{t.privacy}
					</a>
				);
			}
			return part;
		});

	return (
		<main className="relative min-h-screen lg:grid lg:grid-cols-2">
			<div className="bg-muted/60 relative hidden h-full flex-col border-r p-10 lg:flex">
				<div className="from-background absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
				<div className="z-10">
					<Image
						src="/ryuko-wordmark.png"
						alt="Ryuko"
						width={228}
						height={63}
						className="h-8 w-auto"
						priority
					/>
				</div>
				<div className="z-10 flex flex-1 items-center justify-center">
					<Globe markers={markers} arcs={arcs} className="w-[40rem] max-w-full" />
				</div>
				<div className="z-10 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-xl italic">
							{t.quote}
						</p>
						<footer className="font-mono text-sm font-semibold">
							~ Steve Jobs
						</footer>
					</blockquote>
				</div>
			</div>
			<div className="relative flex min-h-screen flex-col justify-center p-4">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 pointer-events-none opacity-60"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full" />
				</div>
				<Button variant="ghost" className="absolute top-7 left-5" asChild>
					<a href="#">
						<ChevronLeftIcon className='size-4 me-2' />
						{t.home}					</a>
				</Button>
				<div className="absolute top-7 right-5">
					<LanguageSelectorDropdown value={lang} onChange={setLang} />
				</div>
				<div className="mx-auto space-y-4 sm:w-sm">
					<div className="flex items-center gap-2 lg:hidden">
						<Image
							src="/ryuko-wordmark.png"
							alt="Ryuko"
							width={228}
							height={63}
							className="h-8 w-auto"
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<h1 className="font-heading text-2xl font-bold tracking-wide">
							{t.heading}
						</h1>
						<p className="text-muted-foreground text-base">
							{t.subheading}
						</p>
					</div>
					<div className="space-y-2">
						<Button type="button" size="lg" className={cn('w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110')}>
							<GoogleIcon className='size-4 me-2' />
							{t.continueGoogle}
						</Button>
						<Button type="button" size="lg" className={cn('w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110')}>
							<AppleIcon className='size-4 me-2' />
							{t.continueApple}
						</Button>
						<Button type="button" size="lg" className={cn('w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110')}>
							<GithubIcon className='size-4 me-2' />
							{t.continueGithub}
						</Button>
					</div>

					<AuthSeparator label={t.or} />

					<form className="space-y-2" onSubmit={handleSubmit} noValidate>
						<p className="text-muted-foreground text-start text-xs">
							{t.emailHint}
						</p>
						<div className="relative h-max">
							<Input
								placeholder="your.email@example.com"
								className="peer ps-9 transition-all focus-visible:shadow-md"
								type="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setEmailError(false);
								}}
								aria-invalid={emailError}
							/>
							<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
								<AtSignIcon className="size-4" aria-hidden="true" />
							</div>
						</div>

						<Button type="submit" className={cn('w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110')}>
							<span>{t.continueEmail}</span>
						</Button>
						{emailError && (
							<p className="text-destructive text-sm">{t.emailInvalid}</p>
						)}
						{sentTo && (
							<p className="text-sm text-emerald-600 dark:text-emerald-400">
								{t.linkSent.replace('{email}', sentTo)}
							</p>
						)}
					</form>
					<p className="text-muted-foreground mt-8 text-sm">
						{renderTerms(t.terms)}
					</p>
				</div>
			</div>
		</main>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

const AuthSeparator = ({ label }: { label: string }) => {
	return (
		<div className="flex w-full items-center justify-center">
			<div className="bg-border h-px w-full" />
			<span className="text-muted-foreground px-2 text-xs">{label}</span>
			<div className="bg-border h-px w-full" />
		</div>
	);
};
