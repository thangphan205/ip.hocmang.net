import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Card, Typography, Space, Spin, Alert, AutoComplete } from 'antd';
import React from 'react';
import { StateType } from '../models/ipv4';
const { Title, Text } = Typography;


interface BasicListProps {
  ipv4: StateType;
  pingv4: StateType;
  traceroutev4: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  loading_pingv4: boolean;
  loading_traceroutev4: boolean;
}

// const Index = ({ dispatch, ipv4: { data_ipv4, data_pingv4, loading } }) => {
const Index: React.FC<BasicListProps> = (props) => {
  const {
    loading,
    loading_pingv4,
    loading_traceroutev4,
    dispatch,
    ipv4: { data_ipv4 },
    pingv4: { data_pingv4 },
    traceroutev4: { data_traceroutev4 },
  } = props;

  const [form] = Form.useForm();
  const [formTraceroute] = Form.useForm();
  const [resultPing, setResultPing] = useState("");


  useEffect(() => {
    dispatch({
      type: 'ipv4/fetch',
    });
  }, [1]);


  const onFinish = values => {
    console.log('Success:', values);
    const params = {
      hostname: values.hostname_pingv4,
    }
    console.log(params);

    dispatch({
      type: 'pingv4/fetch',
      payload: params,
    });
  };

  const handleTracerouteV4 = values => {
    console.log('Success:', values);
    const params = {
      hostname: values.hostname_traceroutev4
    }
    dispatch({
      type: 'traceroutev4/fetch',
      payload: params,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinishFailedTracerouteV4 = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  let renderPingv4 = [];
  let renderTraceoutev4 = [];

  if (data_pingv4.data) {
    renderPingv4 = data_pingv4.data.result.map((item, index) => {
      return <Text key={index}>{item}</Text>
    })
  }
  if (data_traceroutev4.data) {
    renderTraceoutev4 = data_traceroutev4.data.result.map((item, index) => {
      return <Text key={index}>{item}</Text>
    })
  }

  const options = [
    { value: '1.1.1.1' },
    { value: '8.8.8.8' },
    { value: 'google.com' },
    { value: 'facebook.com' },
  ];
  return (
    <div>
      <Card>
        <Row>
          <Col md={6}></Col>
          <Col md={12} >
            <Title copyable>Your IP Address: {data_ipv4.ipv4}</Title>
            <Text>You access <a>http://ip.hocmang.net</a> by IP Address: {data_ipv4.ipv4}</Text>
          </Col>
          <Col md={6}></Col>
        </Row>

      </Card>
      <Card title={"IPv4"} >
        <Form
          form={form}
          {...layout}
          title={"Ping"}
          name="pingv4"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col md={20}>
              <Form.Item
                label="Hostname or IP Address"
                name="hostname_pingv4"
              // rules={[{ required: true, message: 'Please input hostname or IP Address!' }]}
              >
                {/* <Input /> */}
                <AutoComplete
                  style={{ width: '100%' }}
                  options={options}
                  placeholder="Choose the suggestion or type the hostname"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" name="submit_pingv4">
                  Ping
                  </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20}>
              <Form.Item
                label="Ping Result"
              >
                {
                  loading_pingv4 ? (
                    <Spin spinning={loading_pingv4}>
                      <Alert
                        message="System processing..."
                        description={"I'm pinging 4 packets. :)"}
                        type="info"
                      />
                    </Spin>
                  ) : (data_pingv4.data && data_pingv4.data.result.length > 0 ? (
                    <Space direction="vertical" >
                      {renderPingv4.map((item) => item)}
                    </Space>
                  ) : null)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Form
          form={formTraceroute}
          {...layout}
          title={"Traceroutev4"}
          name="traceroutev4"
          onFinish={handleTracerouteV4}
          onFinishFailed={onFinishFailedTracerouteV4}
        >
          <Row>
            <Col md={20}>
              <Form.Item
                label="Hostname or IP Address"
                name="hostname_traceroutev4"
              >
                <AutoComplete
                  style={{ width: '100%' }}
                  options={options}
                  placeholder="Choose the suggestion or type the hostname"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" name="submit_traceroutev4">
                  Traceroute
                  </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20}>
              <Form.Item
                label="Traceroute Result"
              >
                {
                  loading_traceroutev4 ? (
                    <Spin spinning={loading_traceroutev4}>
                      <Alert
                        message="System processing..."
                        type="info"
                      />
                    </Spin>
                  ) : (data_traceroutev4.data && data_traceroutev4.data.result.length > 0 ? (
                    <Space direction="vertical" >
                      {renderTraceoutev4.map((item) => item)}
                    </Space>
                  ) : null)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

// export default connect(({ ipv4, loading }) => ({
//   ipv4,
//   loading: loading.models.ipv4,
// }))(Index);

export default connect(
  ({
    ipv4,
    pingv4,
    traceroutev4,
    loading,
    loading_pingv4,
    loading_traceroutev4,
  }: {
    ipv4: StateType;
    pingv4: StateType;
    traceroutev4: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    loading_pingv4: {
      models: { [key: string]: boolean };
    };
    loading_traceroutev4: {
      models: { [key: string]: boolean };
    };
  }) => ({
    ipv4,
    pingv4,
    traceroutev4,
    loading: loading.models.ipv4,
    loading_pingv4: loading.models.pingv4,
    loading_traceroutev4: loading.models.traceroutev4,
  }),
)(Index);