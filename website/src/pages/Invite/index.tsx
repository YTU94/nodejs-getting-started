import React, { useState, useEffect } from 'react';
import './index.less';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  Card,
  Toast,
  Divider,
} from 'dingtalk-design-mobile';
import * as dd from 'dingtalk-jsapi';

const Home: React.FC = () => {
  const query = new URLSearchParams(location.search);
  const [openConversationId] = useState(() => {
    return query.get('openConversationId') || '';
  });

  const [userInfo, setUserInfo] = useState<any>({});
  const [form] = Form.useForm<{
    title: string;
  }>();

  useEffect(() => {
    console.log('corpId =>>>', query.get('corpId'));
    // 获取免登授权码 https://open.dingtalk.com/document/orgapp-client/obtain-the-micro-application-logon-free-authorization-code
    dd.runtime.permission
      .requestAuthCode({
        corpId: query.get('corpId') || query.get('corpid') || '', // 企业id
      })
      .then((info) => {
        console.log('info', info);
        const code = info.code; // 通过该免登授权码可以获取用户身份
        axios
          .get('/api/getUserInfo', {
            params: {
              requestAuthCode: code,
            },
          })
          .then((result) => {
            return result.data;
          })
          .then((res) => {
            console.log(res.data);
            setUserInfo(res.data);
          });
      })
      .catch((err) => {
        console.error('获取授权码失败：' + err);
      });
  }, []);

  const handleSubmit = React.useCallback(async () => {
    const { name, phone } = form.getFieldsValue();
    if (!phone || !name) {
      Toast.info({ content: '填写信息' });
      return;
    }
    axios
      .post('/api/sendText', {
        txt: name,
        phone: phone,
        openConversationId,
      })
      .then((res) => {
        Toast.success({ content: '发送成功' });
      })
      .catch((err) => {
        Toast.fail({ content: err.message });
      });
  }, [openConversationId]);

  return (
    <div className="page-container">
      {/* <div className="top">
        <img
          width={100}
          height={105}
          style={{ marginBottom: '16px' }}
          src="https://img.alicdn.com/imgextra/i1/O1CN01afsSQZ1IYXEH4wMGH_!!6000000000905-2-tps-200-210.png"
          alt=""
        />
        <h2>恭喜，本地服务启动成功！</h2>
        <p className="sub-title">
          当前服务地址：http://127.0.0.1:7001/index.html
        </p>
        <p className="sub-title">点击下方模拟发送体验卡片效果</p>
      </div> */}
      <Card title={'已接入钉钉免登录'}>
        <div className="user-card">
          <img
            src={
              userInfo?.avatar ||
              'https://img.alicdn.com/imgextra/i2/O1CN01dnoCMI21uCfm2PmmU_!!6000000007044-55-tps-93-93.svg'
            }
            className="logo"
          />
          <div>
            <h3>你好，{userInfo?.name}</h3>
          </div>
        </div>
      </Card>
      <Card title={'发起推荐'}>
        <Form name="basic" form={form} onFinish={handleSubmit}>
          <Form.Item label="推荐人" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="电  话" name="phone" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Divider></Divider>
          <Button htmlType="submit" type="primary" block>
            提交
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Home;
