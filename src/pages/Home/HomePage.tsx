import * as React from 'react'
import styles from './HomePage.module.css'
import MainLogo from 'assets/cg-big-logo.svg'
import { Card, Form, Input, Button } from 'antd'
import { login } from '../../services/StatinaApi'

export const HomePage = () => {
  const onSubmit = (values) => {
    login(values)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return <div className={styles.homeContainer}>hola que tal</div>
}
