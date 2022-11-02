import React, { useState, useEffect } from 'react';
// import { IBaseProps } from '@/interface';
import axios from 'axios';
import { Toast } from 'dingtalk-design-mobile';
import styles from './index.less';

export default function Index() {
  const [num, setNum] = useState();
  useEffect(() => {
    axios
      .post('/api/getPushcode')
      .then((res) => {
        console.log('getPushcode res', res)
        // Toast.success({ content: '发送群吊顶卡片成功' });
        setNum(res?.data?.code);
      })
      .catch((err) => {
        Toast.fail({ content: err.message });
      });
  }, []);

  return (
    <div className={styles.root}>
      <p className="">我的推荐码</p>
      <p className="">{num ?? '暂无'}</p>
    </div>
  );
}
