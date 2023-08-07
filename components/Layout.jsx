import React from 'react';
import { Header } from '.';

<Layout>
    
</Layout>

export default function Layout({children}) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}
