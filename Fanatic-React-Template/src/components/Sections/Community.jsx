import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from "styled-components";
import { useAuth } from '../Member/AuthContext'; // useAuth 훅 임포트
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ReactImage from '../../../src/assets/img/soda.png';
import heart from '../../../src/assets/img/heart.png';
import view from '../../../src/assets/img/watch.png';
import Users from '../../../src/assets/img/users.png';
import { Link, useNavigate } from 'react-router-dom';

const center = {
    lat: 37.886381,
    lng: 127.736857
};

const markers = [
    { id: 1, position: { lat: 37.886447, lng: 127.735785 } },
    { id: 2, position: { lat: 37.885800, lng: 127.736848 } },
    { id: 3, position: { lat: 37.886369, lng: 127.737402 } }
];


const MapComponent = ({ apiKey, handleMarkerClick }) => {
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={center}
                zoom={17}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker.id)}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

const ChatComponent = ({ chatRoomName, messages, setMessages, inputValue, setInputValue, handleSend, handleKeyPress, handleClose, username }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ChatContainer>
            <CloseButton onClick={handleClose}>X</CloseButton>
            <Header>{chatRoomName}</Header> {/* 채팅방 이름 */}
            <MessagesContainer>
                {messages.map((message, index) => (
                    <Message 
                        key={index} 
                        isOwnMessage={message.sender === username}
                    >
                        <MessageHeader>
                            <ChatBotImage src={Users} alt="Avatar" />
                            <MessageInfo>{message.sender} - {message.time}</MessageInfo>
                        </MessageHeader>
                        <MessageContent>{message.text}</MessageContent>
                    </Message>
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요"
                />
                <SendButton onClick={handleSend}>➤</SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default function Community() {
    const { user, cookie } = useAuth();
    const [showPopularPosts, setShowPopularPosts] = useState(true);
    const [activeGrade, setActiveGrade] = useState('grade1');
    const [popularPosts, setPopularPosts] = useState([]);
    const [freePosts, setFreePosts] = useState([]);
    const [chatRoomName, setChatRoomName] = useState('');
    const [messages, setMessages] = useState([]); // 채팅 메시지 목록
    const [inputValue, setInputValue] = useState(''); // 메시지 입력값
    const ws = useRef(null); // WebSocket 레퍼런스 
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // 초기값을 빈 문자열로 설정
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [realTimeSearchTerms, setRealTimeSearchTerms] = useState({
        grade1: [],
        grade2: [],
        grade3: [],
        grade4: []
    });

    const [diaryPosts, setDiaryPosts] = useState([
        { id: 1, title: "Diary Post 1", author: "Author 1", preview: "Preview content 1", image: ReactImage, like: 10, watch: 50, date: "2023.01.01", comments: 5 },
        { id: 2, title: "Diary Post 2", author: "Author 2", preview: "Preview content 2", image: ReactImage, like: 20, watch: 60, date: "2023.02.01", comments: 10 },
        { id: 3, title: "Diary Post 3", author: "Author 3", preview: "Preview content 3", image: ReactImage, like: 30, watch: 70, date: "2023.03.01", comments: 15 },
        { id: 4, title: "Diary Post 4", author: "Author 4", preview: "Preview content 4", image: ReactImage, like: 40, watch: 80, date: "2023.04.01", comments: 20 },
    ]);

    const handleGradeChange = grade => setActiveGrade(grade);
    
    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_Server_IP}/post_view/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${cookie.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPopularPosts(data.popular);
                    setFreePosts(data.free);
                    
                    // 실시간 검색어 내용만 추출하여 상태 업데이트
                    setRealTimeSearchTerms({
                        grade1: data['1'].slice(0, 10).map(item => item[2]), // '1' 학년 실시간 검색어
                        grade2: data['2'].slice(0, 10).map(item => item[2]), // '2' 학년 실시간 검색어
                        grade3: data['3'].slice(0, 10).map(item => item[2]), // '3' 학년 실시간 검색어
                        grade4: data['4'].slice(0, 10).map(item => item[2])  // '4' 학년 실시간 검색어
                    });
                } else {
                    console.error('Failed to fetch popular posts');
                }
            } catch (error) {
                console.error('Error fetching popular posts:', error);
            }
        };
    
        fetchPopularPosts();
    }, []);

    const handleMarkerClick = (markerId) => { //마커 클릭되었을 때
        const fetchPopularPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_Server_IP}/name_check/`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${cookie.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                    console.log(data.username);
                    
                } else {
                    console.error('Failed to fetch popular posts');
                }
            } catch (error) {
                console.error('Error fetching popular posts:', error);
            }
        };
        fetchPopularPosts();
        if (markerId === 1) { 
            const room = "공대 채팅방"; // 이름 설정
            setChatRoomName(room);
            const now = new Date();
            const formattedTime = `${now.getHours()}:${now.getMinutes()}`; //시간 형식
            setMessages([{ text: `여기는 공대 채팅방입니다!`, isBot: true, sender: 'Bot', time: formattedTime }]);
        }
    };

    useEffect(() => { 
        // chatRoomName이 변경될 때마다 실행
        if (chatRoomName) { // chatRoomName이 존재하는 경우 WebSocket 연결 설정
            ws.current = new WebSocket(`${process.env.REACT_APP_Server_II}`);

            ws.current.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.current.onmessage = (event) => {
                console.log(event.data);

                const message = JSON.parse(event.data);
                console.log(`Received: ${event.data}`);
                console.log(messages);
                setMessages((prevMessages) => [...prevMessages, message]);
            };

            ws.current.onclose = () => {
                console.log('WebSocket Disconnected');
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            return () => {
                ws.current.close();
            };
        }
    }, [chatRoomName]);

    const handleSend = () => { // 메시지 전송
        if (ws.current && ws.current.readyState === WebSocket.OPEN && inputValue) {
            const message = { sender: username, text: inputValue, time: new Date().toLocaleTimeString() };
            ws.current.send(JSON.stringify(message));
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleClose = () => {
        setChatRoomName('');
        setMessages([]);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/search/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: searchTerm }) // 검색어를 content로 서버에 전송
            });

            if (response.ok) {
                const data = await response.json();
                setFreePosts(data.search); // 서버로부터 받은 검색 결과를 freePosts에 저장
            } else {
                console.error('Failed to fetch search results');
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleTabClick = (tab) => {
        setShowPopularPosts(tab === 'popular');
    };

    return (
        <Container>
            <TabsContainer>
                <Tab active={showPopularPosts} onClick={() => handleTabClick('popular')}>인기 게시물</Tab>
                <Tab active={!showPopularPosts} onClick={() => handleTabClick('diary')}>일기</Tab>
            </TabsContainer>
            {showPopularPosts ? (
                <div>
                    
                    <CardsContainer>
                        {popularPosts.map(post => (
                            <PopularPostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                author={post.author}
                                preview={post.content}
                                image={ReactImage}
                                like={post.like}
                                watch={post.watch}
                                date={`${post.year}.${post.month}.${post.day}`}
                                comments={post.comment_number}
                            />
                        ))}
                    </CardsContainer>
                </div>
            ) : (
                <div>
                    
                    <CardsContainer>
                        {diaryPosts.map(post => (
                            <PopularPostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                author={post.author}
                                preview={post.preview}
                                image={post.image}
                                like={post.like}
                                watch={post.watch}
                                date={post.date}
                                comments={post.comments}
                            />
                        ))}
                    </CardsContainer>
                </div>
            )}
            <HorizontalRule />
            <MainContent>
                <LeftColumn>
                <StyledSection>
                <CardTitle>자유 게시판</CardTitle>
                        <SearchContainer>
                            <SearchInput 
                                type="text" 
                                placeholder="검색어를 입력하세요" 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                                onKeyPress={handleSearchKeyPress} 
                            />
                            <SearchButton onClick={handleSearchSubmit}>검색</SearchButton>
                        </SearchContainer>
                        <Button to="/freeCommu">자유게시판 바로가기 →</Button>
                        <PostTable>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>글쓴이</th>
                                    <th>날짜</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
    {freePosts.slice(0, 10).map(post => (
        <tr key={post.id}>
            <td>
                <Link to={`/post/${post.id}`}>
                    {post.title}
                    <CommentNumber>[{post.comment_number}]</CommentNumber>
                </Link>
            </td>
            <td>{post.author}</td>
            <td>{post.year}.{post.month}.{post.day}</td>
            <td>
                <Icon src={view} alt="views" />
                <span>{post.watch}</span>
            </td>
        </tr>
    ))}
</tbody>
                        </PostTable>
                    </StyledSection>
                </LeftColumn>
                <RightColumn>
            <GradeTabs>
                {Object.keys(realTimeSearchTerms).map(grade => (
                    <GradeTab key={grade} active={activeGrade === grade} onClick={() => handleGradeChange(grade)}>
                        {grade.replace('grade', '')}학년
                    </GradeTab>
                ))}
            </GradeTabs>
            <SearchList>
    {realTimeSearchTerms[activeGrade].map((term, index) => (
        <SearchItem key={index}>
            <RankNumber>{index + 1}</RankNumber>
            <SearchTerm>{term}</SearchTerm>
        </SearchItem>
    ))}
</SearchList>
        </RightColumn>
            </MainContent>
            <HorizontalRule />
            <StyledSection>
            <CardTitle>지도 및 채팅방</CardTitle>
            <MapAndChatContainer>
            <MapContainer>
        <MapComponent apiKey="AIzaSyA6YxyGqgTTzQPYmjqBq5am4Q-KsyFDV3Y" handleMarkerClick={handleMarkerClick} />
    </MapContainer>
                    {chatRoomName && (
                        <ChatComponent
                            chatRoomName={chatRoomName} //채팅방 이름
                            messages={messages} // 채팅 메시지 목록 전달
                            setMessages={setMessages} // 메시지 목록 업데이트하는 함수
                            inputValue={inputValue} // 메시지 입력 값 전달
                            setInputValue={setInputValue} // 메시지 입력 값 업데이트 함수
                            handleSend={handleSend} // 메시지 전송 함수
                            handleKeyPress={handleKeyPress} // 키보드 입력 처리 함수
                            handleClose={handleClose} // 추가된 부분
                            username={username} // 사용자명 전달
                        />
                    )}
                </MapAndChatContainer>
            </StyledSection>
        </Container>
    );
}

/* 섹션 스타일 */
const Section = styled.section`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
`;

const StyledSection = styled(Section)`
    position: relative; // 이를 기준으로 Button을 배치
    background-color: #DFF8D8; // 연두색 배경
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
`;

/* 컨테이너 기본 설정 */
const Container = styled.div`
    padding: 20px;
    margin-top: 80px;
    background-color: #EFF8F3;
    display: flex;
    flex-direction: column;
`;

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    color: ${props => props.active ? '#4CAF50' : 'black'};
    border-bottom: ${props => props.active ? '2px solid #4CAF50' : 'none'};
    &:hover {
        color: #45a049;
    }
`;

/* 카드 컨테이너 */
const CardsContainer = styled.div`
    display: flex;
    justify-content: center; // 카드들을 가운데 정렬합니다.
    flex-wrap: wrap;
    margin: 0; // 외부 마진 제거
    padding: 0 10px; // 양쪽 패딩을 추가하여 카드들 사이의 간격을 조정합니다.
`;

const MapAndChatContainer = styled.div`
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    width: 100%;
`;

const MapContainer = styled.div`
    flex: 1;
    max-width: 45%; // 지도의 최대 너비를 50%로 설정
    padding: 20px;
    background: #f0f0f0; // 배경 색상 설정
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 50%; /* 가로 너비를 50%로 설정 */
    margin-left: 20px; /* 왼쪽 여백 추가 */
    border: 1px solid #ccc;
    background-color: #eff8f3;
    overflow: hidden;
    position: relative; /* X 버튼을 위한 상대적 위치 설정 */
`;

const Header = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #ccffcc;
  & > div {
    animation: ${props => props.isNewMessage ? slideInMessages : 'none'} 0.5s forwards;
  }
`;


const Message = styled.div`
  background-color: ${props => (props.isOwnMessage ? '#FAFAD2' : '#ccffcc')}; // 본인 메시지: 밝은 노란색, 다른 사람 메시지: 밝은 초록색
  color: ${props => (props.isOwnMessage ? 'black' : 'black')};
  align-self: ${props => (props.isOwnMessage ? 'flex-end' : 'flex-start')}; // 본인 메시지: 오른쪽 정렬, 다른 사람 메시지: 왼쪽 정렬
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isOwnMessage ? 'flex-end' : 'flex-start')}; // 본인 메시지: 오른쪽 정렬, 다른 사람 메시지: 왼쪽 정렬
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    ${props => (props.isOwnMessage ? 'right: -10px;' : 'left: -10px;')} // 본인 메시지: 오른쪽 말풍선 꼬리, 다른 사람 메시지: 왼쪽 말풍선 꼬리
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${props => (props.isOwnMessage ? '#FAFAD2' : '#ccffcc')}; // 본인 메시지: 노란색 말풍선 꼬리, 다른 사람 메시지: 초록색 말풍선 꼬리
    ${props => (props.isOwnMessage ? 'border-right: 0;' : 'border-left: 0;')}
    ${props => (props.isOwnMessage ? 'margin-top: -10px;' : 'margin-top: -10px;')}
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const MessageContent = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const MessageInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #ffffff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  background-color: #4CAF50;
  border: none;
  padding: 10px;
  margin-left: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const ChatBotImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #45a049; /* X 버튼의 색상 */

    &:hover {
        color: #45a049; /* 호버 시 색상 변경 */
    }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 255, 0, 0.5); // 반투명 남색 오버레이
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  align-items: center;
  padding: 10px;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform: translateY(100%);
  opacity: 0;
`;

const OverlayTitle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 255, 0, 0.5); // 남색 반투명 배경
  color: white;
  text-align: center;
  padding: 10px;
  transition: opacity 0.5s ease; // 페이드 아웃 효과
  opacity: 1; // 기본적으로 표시
`;

/* 각 카드 스타일 */
const Card = styled.div`
  position: relative;
  width: 300px;
  height: 180px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: white; /* 여기에 흰색 배경을 지정합니다 */
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    ${Overlay} {
      transform: translateY(0);
      opacity: 1;
    }
    ${OverlayTitle} {
      opacity: 0;
    }
  }
`;

const FreedomPostCard = styled(Card)`
  width: 1000px; // 너비를 300px로 늘림
  background-color: white; // 배경색을 흰색으로 지정
`;

const FreedomLink = styled(Link)`
  position: absolute;
  right: 20px; // 우측에서 20px
  top: 20px; // 상단에서 20px
  color: #4CAF50; // 초록색 텍스트
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease; // 색상 변경 애니메이션

  &:hover {
    color: #45a049; // 호버 시 색상 변경
  }
`;

const Title = styled.h2`
  font-size: 16px;
  text-align: center;
`;

const Author = styled.div`
  font-size: 14px;
`;

const ContentPreview = styled.p`
  font-size: 12px;
  padding: 5px;
  text-align: center;
`;

const PopularPostCard = ({ id, title, author, preview, image, like, watch, date, comments }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    return (
        <Card bgImage={image} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => navigate(`/post/${id}`)}>
            <CardOverlayTitle style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)', position: 'absolute', bottom: 0, width: '100%', opacity: hover ? 0 : 1 }}>
                <Title>{title}</Title>
                <Icons>
                    <IconContainer>
                        <Icon src={heart} alt="likes" />
                        <IconCount>{like}</IconCount>
                    </IconContainer>
                    <IconContainer>
                        <Icon src={view} alt="views" />
                        <IconCount>{watch}</IconCount>
                    </IconContainer>
                </Icons>
            </CardOverlayTitle>
            <Overlay style={{ transform: hover ? 'translateY(0)' : 'translateY(100%)', opacity: hover ? 1 : 0 }}>
                <Title>{title}</Title>
                <Author>{author}</Author>
                <ContentPreview>{preview}</ContentPreview>
                <PostDetails>
                    <PostDate>{date}</PostDate>
                    <CommentsCount>댓글수: {comments}</CommentsCount>
                </PostDetails>
            </Overlay>
        </Card>
    );
};


const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
    width: 70%;
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const RankNumber = styled.span`
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    margin-right: 10px;
`;

const SearchTerm = styled.span`
    flex: 1;
    text-align: center;  // 중앙 정렬
    font-weight: 600;   // 텍스트 굵게
`;

const CardOverlayTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 255, 0, 0.5);
  position: absolute;
  bottom: 0;
  width: 100%;
`;


const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const IconCount = styled.span`
  font-size: 14px;
`;

const PostDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const CommentsCount = styled.div`
  font-size: 14px;
  color: #4CAF50;
`;

const PostTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #4CAF50; /* 초록색 굵은 테두리 추가 */
    margin-top: 10px;

    th, td {
        border: none; /* 수직 줄을 없애기 위해 변경된 부분 */
        border-bottom: 1px solid #ddd; /* 수평 줄을 추가 */
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;




const CommentNumber = styled.span`
    color: #4CAF50;
    margin-left: 5px;
`;

/* 카드 이미지 */
const CardImage = styled.img`
    width: 100%;
    height: 200px; // 이미지 높이를 늘려 정사각형 근사치 유지
    object-fit: cover;
`;

/* 카드 내용 */
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

/* 카드 타이틀 */
const CardTitle = styled.h2`
    margin-bottom: 20px;
`;

const CardAuthor = styled.div`
  font-size: 14px;
  text-align: center;
`;

/* 카드 설명 */
const CardDescription = styled.p`
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 0 10px; // 좌우 패딩 추가
`;

/* 메인 콘텐츠 */
const MainContent = styled.div`
    display: flex;
`;

/* 왼쪽 컬럼 */
const LeftColumn = styled.div`
    flex: 2;
    margin-right: 20px;
`;

/* 오른쪽 컬럼 */
const RightColumn = styled.div`
    flex: 1;
    background-color: #DFF8D8; /* 연두색 배경 추가 */
    padding: 20px; /* 패딩 추가 */
    border-radius: 10px; /* 모서리 둥글게 처리 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 그림자 효과 추가 */
    height: 650px;
`;

/* 지도 플레이스홀더 */
const MapPlaceholder = styled.div`
    width: 200px;
    height: 200px;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

/* 채팅방 컨테이너 */
const ChatRoomsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
    flex: 1;
`;


/* 채팅방 카드 */
const ChatRoomCard = styled.div`
    height: 150px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    cursor: pointer;
`;

/* 채팅방 이미지 */
const ChatRoomImage = styled.img`
    width: 100%;
    height: 100px;
    object-fit: cover;
`;

/* 애니메이션 키프레임 */
const slideInMessages = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
`;

const slideInTerms = keyframes`
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
`;

/* 용어 슬라이드 컨테이너 */
const TermContainer = styled.div`
    overflow: hidden;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

/* 용어 슬라이드 */
/* 용어 슬라이드 */
const TermSlide = styled.div`
    animation: ${props => props.animating ? slideOut : slideInTerms} 1s forwards;
    width: 100%;
    text-align: center;
`;


/* 지도 컨테이너 스타일 */
const containerStyle = {
    width: '500px',
    height: '400px'
};

const GradeTabs = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const GradeTab = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: ${props => props.active ? '#FFD700' : 'transparent'};
    color: ${props => props.active ? 'white' : 'black'};
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #FFD700;
        color: white;
    }
`;

const SearchList = styled.div`
    list-style: none;
    background-color: #DFF8D8; /* 연두색 배경 추가 */
    padding: 10px; /* 내부 패딩 변경 */
    margin-bottom: 20px; /* 아래 마진 추가 */
    border-radius: 8px; /* 모서리 둥글게 처리 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 그림자 효과 추가 */
    height: auto; /* 높이 자동 조절 */
`;


const SearchItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const Button = styled(Link)`
    position: absolute;
    right: 20px; // 우측에서 20px
    top: 20px; // 상단에서 20px
    color: #4CAF50; // 초록색 텍스트
    font-weight: bold;
    text-decoration: none;
    &:hover {
        text-decoration: underline; // 호버 시 밑줄 효과
        color: #45a049; // 호버 시 색상 변경
    }
`;

const HorizontalRule = styled.hr`
    border: none;
    height: 2px;
    background-color: #ccc; // 회색 톤으로 설정
    margin: 20px 0; // 상하 마진 추가
}
`;