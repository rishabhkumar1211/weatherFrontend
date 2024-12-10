'use client'
import React, {useEffect} from 'react';
import styles from './Test.module.css';
const Test = () => {
    useEffect(() => {
        console.log('did mount')
    }, []);

    return <div className={`${styles.label}`}>Hello</div>
}

export default Test
