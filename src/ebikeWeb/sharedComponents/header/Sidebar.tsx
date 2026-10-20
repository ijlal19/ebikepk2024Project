"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Collapse from '@mui/material/Collapse';
import {
    Close, Search, TwoWheelerOutlined, SellOutlined, ForumOutlined,
    StorefrontOutlined, BuildOutlined, ArticleOutlined, NewspaperOutlined,
    PlayCircleOutline, MoreHoriz, ExpandMore, ChevronRight, Login,
    Logout, PhoneAndroidOutlined, AddCircleOutline, VerifiedUserOutlined,
} from '@mui/icons-material';
import styles from './Sidebar.module.scss';

type Props = {
    onClose: () => void;
    onLogin: () => void;
    onLogout: () => void;
    loggedIn: boolean;
    query: string;
    onQueryChange: (value: string) => void;
    onSearch: () => void;
};

const menu = [
    { label: 'Buy & Sell Bikes', icon: SellOutlined, children: [
        { label: 'Find Used Bikes', url: '/used-bikes', icon: Search },
        { label: 'Sell Your Bike', url: '/used-bikes/sell-used-bike', icon: AddCircleOutline, requiresLogin: true },
    ] },
    { label: 'New Bikes', url: '/new-bikes', icon: TwoWheelerOutlined },
    { label: 'My Ads', url: '/my-ads', icon: SellOutlined },
    { label: 'Bikers Forum', url: '/forum', icon: ForumOutlined },
    { label: 'Find Dealers', icon: StorefrontOutlined, children: [
        { label: 'Showrooms', url: '/dealers', icon: StorefrontOutlined },
        { label: 'Registration', url: '/dealers/register', icon: AddCircleOutline, requiresLogin: true },
    ] },
    { label: 'Find Mechanics', icon: BuildOutlined, children: [
        { label: 'Workshops', url: '/mechanics', icon: BuildOutlined },
        { label: 'Registration', url: '/mechanics/register', icon: AddCircleOutline, requiresLogin: true },
    ] },
    { label: 'Blog', url: '/blog', icon: ArticleOutlined },
    { label: 'News', url: '/blog/news', icon: NewspaperOutlined },
    { label: 'Bike Videos', url: '/bike-videos', icon: PlayCircleOutline },
    { label: 'More', icon: MoreHoriz, children: [
        { label: 'YouTube Channel', url: 'https://www.youtube.com/@ebikepk', icon: PlayCircleOutline },
        ...['Sindh', 'Punjab', 'Islamabad', 'KPK'].map(region => ({
            label: `Bike Verification ${region}`, url: `/mtmis-${region.toLowerCase()}`, icon: VerifiedUserOutlined,
        })),
    ] },
];

export default function Sidebar({ onClose, onLogin, onLogout, loggedIn, query, onQueryChange, onSearch }: Props) {
    const pathname = usePathname();
    const isActive = (url: string) => pathname === url || (
        url !== '/blog' && url !== '/used-bikes' && pathname.startsWith(`${url}/`)
    ) || (url === '/used-bikes' && pathname.startsWith('/used-bikes/') && pathname !== '/used-bikes/sell-used-bike');
    const [expanded, setExpanded] = useState<string[]>(() => menu
        .filter(item => item.children?.some(child => isActive(child.url)))
        .map(item => item.label));

    return (
        <aside className={styles.sidebar} aria-label="Main navigation">
            <div className={styles.header}>
                <Link href="/" onClick={onClose} className={styles.brand}>
                    <img
                        className={styles.brandLogo}
                        src="https://res.cloudinary.com/dzfd4phly/image/upload/c_limit,dpr_auto,f_auto,q_auto,w_180,fl_strip_profile/v1727251053/Untitled-2_gsuasa.png"
                        alt="ebike.pk"
                    />
                </Link>
                <button className={styles.close} onClick={onClose} aria-label="Close menu"><Close /></button>
            </div>

            <form className={styles.search} onSubmit={event => { event.preventDefault(); if (query.trim()) { onSearch(); onClose(); } }}>
                <input aria-label="Search ebike.pk" placeholder="Search bikes and more..." value={query} onChange={event => onQueryChange(event.target.value)} />
                <button type="submit" aria-label="Search"><Search /></button>
            </form>

            <nav className={styles.navigation} aria-label="Explore ebike.pk">
                <p className={styles.sectionLabel}>EXPLORE</p>
                {menu.map(item => {
                    const Icon = item.icon;
                    const active = item.url ? isActive(item.url) : item.children?.some(child => isActive(child.url));
                    const isExpanded = expanded.includes(item.label);
                    const content = <><span className={styles.icon}><Icon /></span><span>{item.label}</span></>;
                    return (
                        <div key={item.label} className={styles.menuGroup}>
                            {item.children ? (
                                <button className={`${styles.menuItem} ${active ? styles.active : ''}`} aria-expanded={isExpanded} aria-controls={`sidebar-${item.label.replaceAll(' ', '-')}`} onClick={() => setExpanded(current => isExpanded ? current.filter(label => label !== item.label) : [...current, item.label])}>
                                    {content}<ExpandMore className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`} />
                                </button>
                            ) : (
                                <Link href={item.url!} onClick={onClose} aria-current={active ? 'page' : undefined} className={`${styles.menuItem} ${active ? styles.active : ''}`}>
                                    {content}<ChevronRight className={styles.chevron} />
                                </Link>
                            )}
                            {item.children && (
                                <Collapse in={isExpanded} unmountOnExit>
                                    <div className={styles.submenu} id={`sidebar-${item.label.replaceAll(' ', '-')}`}>
                                        {item.children.map(child => {
                                            const ChildIcon = child.icon;
                                            const className = `${styles.submenuItem} ${isActive(child.url) ? styles.active : ''}`;
                                            return 'requiresLogin' in child && child.requiresLogin && !loggedIn ? (
                                                <button key={child.url} className={className} onClick={onLogin}><ChildIcon /><span>{child.label}</span></button>
                                            ) : (
                                                <Link key={child.url} href={child.url} className={className} onClick={onClose} aria-current={isActive(child.url) ? 'page' : undefined}><ChildIcon /><span>{child.label}</span></Link>
                                            );
                                        })}
                                    </div>
                                </Collapse>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.login} onClick={loggedIn ? onLogout : onLogin}>
                    {loggedIn ? <Logout /> : <Login />}<span>{loggedIn ? 'Logout' : 'Login / Sign up'}</span><ChevronRight />
                </button>
                <div className={styles.appCard}>
                    <div className={styles.appHeading}><PhoneAndroidOutlined /><div><strong>Take ebike with you</strong><p>Find your next ride on the go.</p></div></div>
                    <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_fill,f_auto,q_auto,w_120,h_35/v1583472423/ebike-graphics/logos/google_logo_1.png" alt="Get it on Google Play" width="120" height="35" />
                </div>
            </div>
        </aside>
    );
}
