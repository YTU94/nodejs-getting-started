import React from 'react'
// import { IBaseProps } from '@/interface';

import styles from './index.less';

interface IProps { }

export default function Index(props: IProps) {
  const { } = props;
  return (
    <div className={styles.root}>
      <p className="">我的推荐码</p>
      <p className="">UM13</p>
    </div>
  )
}
