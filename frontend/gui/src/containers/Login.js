import { Form, Input, Button, Spin  } from 'antd';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { useNavigate } from "react-router-dom";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Demo = (props) => {
    let navigate = useNavigate()

    const onFinish = (values) => {
        props.onAuth(values.username, values.password);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <h1>{props.error.message}</h1>
        );
    }

    if (props.token) {
        navigate('/')
    }

    return (
        <div>
            {errorMessage}
            {
                props.loading ? <Spin indicator={antIcon} /> :
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        or
                        <NavLink
                            style={{ marginRight: '10px' }}
                            to='/signup/'> signup
                        </NavLink>
                    </Form.Item>
                </Form>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);