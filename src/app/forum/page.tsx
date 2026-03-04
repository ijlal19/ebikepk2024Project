import * as React from 'react';
import Home from '@/ebikeForum/forumPages/home';
import Header from '@/ebikeForum/forumSharedComponent/header';

export default function ForumPage() {
    return (
        <>
            <Header />
            <React.Suspense fallback={null}>
                <Home />
            </React.Suspense>
        </>
    );
}
