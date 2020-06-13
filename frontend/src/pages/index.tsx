import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Card, Typography, Space, Spin, Alert, AutoComplete } from 'antd';
import React from 'react';
import { StateType } from '../models/ipv4';
import { StateTypePingV6 } from '../models/pingv6';
import { StateTypeTracerouteV6 } from '../models/traceroutev6';
const { Title, Text } = Typography;


interface BasicListProps {
  ipv4: StateType;
  pingv4: StateType;
  traceroutev4: StateType;
  pingv6: StateTypeTracerouteV6;
  traceroutev6: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  loading_pingv4: boolean;
  loading_traceroutev4: boolean;
  loading_pingv6: boolean;
  loading_traceroutev6: boolean;
}

// const Index = ({ dispatch, ipv4: { data_ipv4, data_pingv4, loading } }) => {
const Index: React.FC<BasicListProps> = (props) => {
  const {
    loading,
    loading_pingv4,
    loading_traceroutev4,
    loading_pingv6,
    loading_traceroutev6,
    dispatch,
    ipv4: { data_ipv4 },
    pingv4: { data_pingv4 },
    traceroutev4: { data_traceroutev4 },
    pingv6: { data_pingv6 },
    traceroutev6: { data_traceroutev6 },
  } = props;

  const [form] = Form.useForm();
  const [formPingV6] = Form.useForm();

  const [formTraceroute] = Form.useForm();
  const [formTracerouteV6] = Form.useForm();
  const [resultPing, setResultPing] = useState("");


  useEffect(() => {
    dispatch({
      type: 'ipv4/fetch',
    });
  }, [1]);


  const onFinish = values => {

    const params = {
      hostname: values.hostname_pingv4,
    }
    dispatch({
      type: 'pingv4/fetch',
      payload: params,
    });
  };

  const onFinishV6 = values => {

    const params = {
      hostname: values.hostname_pingv6,
    }

    dispatch({
      type: 'pingv6/fetch',
      payload: params,
    });
  };

  const handleTracerouteV4 = values => {

    const params = {
      hostname: values.hostname_traceroutev4
    }
    dispatch({
      type: 'traceroutev4/fetch',
      payload: params,
    });
  };
  const handleTracerouteV6 = values => {

    const params = {
      hostname: values.hostname_traceroutev6
    }
    dispatch({
      type: 'traceroutev6/fetch',
      payload: params,
    });
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinishFailedV6 = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinishFailedTracerouteV4 = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinishFailedTracerouteV6 = errorInfo => {
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
  let renderPingv6 = [];
  let renderTraceoutev6 = [];
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
  if (data_pingv6.data) {
    renderPingv6 = data_pingv6.data.result.map((item, index) => {
      return <Text key={index}>{item}</Text>
    })
  }
  if (data_traceroutev6.data) {
    renderTraceoutev6 = data_traceroutev6.data.result.map((item, index) => {
      return <Text key={index}>{item}</Text>
    })
  }
  const options = [
    { value: '1.1.1.1' },
    { value: '8.8.8.8' },
    { value: 'google.com' },
    { value: 'facebook.com' },
  ];
  const optionsV6 = [
    { value: '2606:4700:4700::1111' },
    { value: '2001:4860:4860::8888' },
    { value: 'google.com' },
    { value: 'facebook.com' },
  ];
  return (
    <div>
      <Card>
        <Row>
          <Col md={6}></Col>
          <Col md={12} >
            <Title copyable>Your IP Address: {data_ipv4.ip}</Title>
            <Text>You access <a>http://ip.hocmang.net</a> by IP Address: {data_ipv4.ip}</Text>
          </Col>
          <Col md={6}></Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={12} >
            <Title level={4} copyable={{ text: 'curl http://ip.hocmang.net/api/' }}>API: curl http://ip.hocmang.net/api/</Title>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Card>
      <Card title={"Check IPv6:"} >
        <Form
          form={formPingV6}
          {...layout}
          title={"Ping"}
          name="pingv6"
          onFinish={onFinishV6}
          onFinishFailed={onFinishFailedV6}
        >
          <Row>
            <Col md={20}>
              <Form.Item
                label="Hostname or IP Address"
                name="hostname_pingv6"
              // rules={[{ required: true, message: 'Please input hostname or IP Address!' }]}
              >
                {/* <Input /> */}
                <AutoComplete
                  style={{ width: '100%' }}
                  options={optionsV6}
                  placeholder="Choose the suggestion or type the hostname"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" name="submit_pingv6">
                  Ping
                  </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20}>
              <Form.Item
                label="IPv6 Ping Result"
              >
                {
                  loading_pingv6 ? (
                    <Spin spinning={loading_pingv6}>
                      <Alert
                        message="System processing..."
                        description={"I'm pinging 4 packets. :)"}
                        type="info"
                      />
                    </Spin>
                  ) : (data_pingv6.data && data_pingv6.data.result.length > 0 ? (
                    <Space direction="vertical" >
                      {renderPingv6.map((item) => item)}
                    </Space>
                  ) : null)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Form
          form={formTracerouteV6}
          {...layout}
          title={"Traceroutev6"}
          name="traceroutev6"
          onFinish={handleTracerouteV6}
          onFinishFailed={onFinishFailedTracerouteV6}
        >
          <Row>
            <Col md={20}>
              <Form.Item
                label="Hostname or IP Address"
                name="hostname_traceroutev6"
              >
                <AutoComplete
                  style={{ width: '100%' }}
                  options={optionsV6}
                  placeholder="Choose the suggestion or type the hostname"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" name="submit_traceroutev6">
                  Traceroute
                  </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20}>
              <Form.Item
                label="IPv6 Traceroute Result"
              >
                {
                  loading_traceroutev6 ? (
                    <Spin spinning={loading_traceroutev6}>
                      <Alert
                        message="System processing..."
                        type="info"
                      />
                    </Spin>
                  ) : (data_traceroutev6.data && data_traceroutev6.data.result.length > 0 ? (
                    <Space direction="vertical" >
                      {renderTraceoutev6.map((item) => item)}
                    </Space>
                  ) : null)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>


      <Card title={"Check IPv4"} >
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
                label="IPv4 Ping Result"
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
                label="IPv4 Traceroute Result"
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
    pingv6,
    traceroutev6,
    loading,
    loading_pingv4,
    loading_traceroutev4,
    loading_pingv6,
    loading_traceroutev6,
  }: {
    ipv4: StateType;
    pingv4: StateType;
    traceroutev4: StateType;
    pingv6: StateTypePingV6;
    traceroutev6: StateTypeTracerouteV6;
    loading: {
      models: { [key: string]: boolean };
    };
    loading_pingv4: {
      models: { [key: string]: boolean };
    };
    loading_traceroutev4: {
      models: { [key: string]: boolean };
    };
    loading_pingv6: {
      models: { [key: string]: boolean };
    };
    loading_traceroutev6: {
      models: { [key: string]: boolean };
    };
  }) => ({
    ipv4,
    pingv4,
    traceroutev4,
    pingv6,
    traceroutev6,
    loading: loading.models.ipv4,
    loading_pingv6: loading.models.pingv6,
    loading_traceroutev6: loading.models.traceroutev6,
  }),
)(Index);