import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RecoilRoot, useRecoilState } from 'recoil';
import { AtomUserName } from '../atom/atom';


const Body = styled.div`
    position : absolute;
    width : 100%;
    height : 100%;
    background : rgb(239, 242, 245);
`;

const HeadLogo = styled.div`
        background : rgb(239, 242, 245);
`;

const Logotext = styled.p`
    font-size : 100px;
    font-weight : bold;
    text-align : center;
    color : orange;
`;

const ContentDiv = styled.div`
   margin:0 auto; 
`;

const ContentBox = styled.div` 
    margin:0 auto; 
    background: white;
    width: 400px;
    height: auto;
    border-radius : 2%;
    box-shadow: 1px 2px 6px gray;
    text-align : center;
`;

const ContentmainText = styled.p`
    color : black;
    font-size : 20px;
    display : block;
    padding-top : 5%;
    padding-bottom : 5%;
`;

const Contentnum = styled.input`
    width: 300px;
    height : 35px;
    margin-bottom : 2%;
    border: solid 2px #a5a7a3;
    background-color: rgb(239, 242, 245);
    border-radius : 5px;
`;

const Contentpwd = styled.input`
    width: 300px;
    height : 35px;
    margin-bottom : 5%;
    border: solid 2px #a5a7a3;
    background-color: rgb(239, 242, 245);
    border-radius : 5px;
`;

const LoginButton = styled.button`
    width: 310px;
    height : 40px;
    margin-bottom : 3%;
    background: orange;
    color : white;
    font-weight : bold;
    border-radius : 5px;
    border : 2px solid orange;
`;

const ContentnotIdText = styled.p`
    color : orange;
    font-size : 15px;
    display : block;
    font-weight : bold;
`;

const ContentorText = styled.p`
    color : gray;
    font-size : 15px;
    display : block;
    font-weight : bold;
`;

const SignupButton = styled.button`
    width: 145px;
    height : 40px;
    margin-bottom : 10%;
    margin-right : 3%;
    background: #fe6b6b;
    color : white;
    font-weight : bold;
    border-radius : 5px;
    border : 2px solid #fe6b6b;
`;

const BackButton = styled.button`
    width: 145px;
    height : 40px;
    margin-bottom : 10%;
    background : #a5a7a3;
    color : white;
    font-weight : bold;
    border-radius : 5px;
    border: solid 2px #a5a7a3;
    
`;



function Login() {
    let navigation = useNavigate()
    const [atUserName, setAtUserName] = useRecoilState(AtomUserName)

    function LoginClick(params) {
        navigation('/main')
    }

    const [input, setinput] = useState({
        num: '',
        pwd: '',
    });

    const onChange = (e) => {
        const { value, name } = e.target;
        setinput({
            ...input,
            [name]: value
        });
    };

    function userLogin() {
        axios.get('http://sunsalman.iptime.org:8080/login', {
            params: {
                num: input.num,
                pwd: input.pwd,
            }

        }).then((res) => {
            console.log(res.data);
            setAtUserName(res.data.name)
            alert('로그인 되셨습니다!')
            navigation('/main')

        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        console.log(input);

    }, [input])

    return (
        <Body>
            <HeadLogo>
                <Logotext>ShowBlog</Logotext>
            </HeadLogo>
            <ContentBox>
                <ContentmainText>ShowBlog에 로그인</ContentmainText>
                <Contentnum name="num" placeholder='전화번호 입력' onChange={onChange}></Contentnum>
                <Contentpwd name="pwd" placeholder='비밀번호 입력' type="password" onChange={onChange}></Contentpwd>
                <LoginButton onClick={userLogin}>로그인하기</LoginButton>
                <ContentnotIdText>계정을 잊으셨나요?</ContentnotIdText>
                <ContentorText>-----------------------또는-----------------------</ContentorText>
                <Link to="/signup">
                    <SignupButton>새계정 만들기</SignupButton>
                </Link>
            </ContentBox>
        </Body>




    );
}

export default Login;
