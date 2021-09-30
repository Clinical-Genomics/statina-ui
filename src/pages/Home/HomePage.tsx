import * as React from 'react';
import styles from './HomePage.module.css';
import MainLogo from '../../assets/cg-big-logo.svg';

export const HomePage = () => (
  <div className={styles.homeContainer}>
    <h1>Welcome to the visualization tool for NIPT data</h1>
    <h3>
      This application is developed and maintained by{' '}
      <a href={'https://www.scilifelab.se/units/clinical-genomics-stockholm/'}>
        Clinical Genomics - Scilifelab
      </a>
      .
    </h3>
    <h3>
      Sign in to view your data or ask an authorized Colleague to make an
      account application for you.
    </h3>
    <br />
    <img className={styles.homePicture} src={MainLogo} alt={'CG Logo'}></img>
  </div>
);
