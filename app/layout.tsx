import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'capsoul — A plastic-free space for your meds and supplements.',
 description: 'Meet capsoul. Thoughtfully designed stainless steel pill cases for your daily ritual. Discover Sage Clutch and Bare Steel. First collection in development.',
 icons: {icon: {url:'/favicon.svg?v=2', type:'image/svg+xml', sizes:'any'}, shortcut:'/favicon.svg?v=2'},
 openGraph:{title:'capsoul — A plastic-free space for your meds and supplements.',description:'A thoughtful home for your daily routine. Meet the first capsoul collection.',images:['/images/hero.png']},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
