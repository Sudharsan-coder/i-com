import { Input, PasswordInput } from "@mantine/core";
import { styled } from "styled-components";
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
const Register = ({ close }) => {
    const [reg, setreg] = useState({
        first: "",
        Last: "",
        emailid: "",
        username: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5010/auth/register", reg)
            .then((res) => {
                console.log(res);
                close(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Name>
                    <Input.Wrapper label="First Name" withAsterisk>
                        <Input
                            placeholder="Your First Name"
                            radius="md"
                            value={reg.first}
                            onChange={(e) => {
                                setreg({ ...reg, first: e.target.value });
                            }}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Last Name" withAsterisk>
                        <Input
                            placeholder="Your Last Name"
                            radius="md"
                            value={reg.last}
                            onChange={(e) => {
                                setreg({ ...reg, last: e.target.value });
                            }}
                        />
                    </Input.Wrapper>
                </Name>
                <Input
                    icon={<IconUserCircle />}
                    placeholder="Your UserName"
                    radius="md"
                    value={reg.username}
                    onChange={(e) => {
                        setreg({ ...reg, username: e.target.value });
                    }}
                />
                <Input icon={<IconAt />} placeholder="Your email" radius="md" />
                <PasswordInput
                    placeholder="Your password"
                    icon={<IconLock size="1rem" />}
                    value={reg.password}
                    onChange={(e) => {
                        setreg({ ...reg, password: e.target.value });
                    }}
                />
                <RegisterBtn
                    type="submit"
                    onClick={() =>{
                        notifications.show({
                            title: "Registered Successfully",
                            message: "Hey there, welcome to our community",
                        })
                        close(false);
                        }
                    }
                >
                    Register
                </RegisterBtn>
            </Form>
        </Container>
    );
};

export default Register;

const Container = styled.div``;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
        padding: 0.5rem;
    }
`;
const RegisterBtn = styled.button`
    padding: 0.6rem;
    color: white;
    background-color: #3939f4;
    border: none;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

const Name = styled.div`
    display: flex;
    gap: 20px;
`;
