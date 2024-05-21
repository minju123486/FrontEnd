import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Member/AuthContext'; // useAuth 훅 임포트
import heart from '../../../src/assets/img/heart.png';
import watch from '../../../src/assets/img/watch.png';
import Users from '../../../src/assets/img/users.png';

const FreeCommu = () => {
    const { cookie } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [postsPerPage] = useState(8); // 페이지당 포스트 수 상태
    const [currentPosts, setCurrentPosts] = useState([]); // 현재 페이지에 표시할 포스트 목록 상태
    const [allPosts, setAllPosts] = useState([]); // 모든 포스트 목록
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true); // 로딩 시작
                const response = await fetch(`${process.env.REACT_APP_Server_IP}/post_view/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllPosts(data.free);
                } else {
                    console.error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const term = params.get('search');
        if (term) {
            setSearchTerm(term);
        }
    }, [location]);

    useEffect(() => {
        const filteredPosts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
        setCurrentPosts(filteredPosts);
    }, [currentPage, allPosts, postsPerPage]);
    
    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSearchSubmit = async () => {
        setCurrentPage(1);
        try {
            setIsLoading(true); // 로딩 시작
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/search/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: searchTerm }) // 검색어
            });
    
            if (response.ok) {
                const data = await response.json();
                setAllPosts(data.search); // 검색결과 AllPosts에 저장
            } else {
                console.error('Failed to fetch search results');
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false); // 로딩 완료
        }
    };

    const handleSearchButtonClick = () => {
    handleSearchSubmit();
};

const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearchSubmit();
    }
};

useEffect(() => {
    setIsLoading(false); // 페이지 로드가 완료되면 로딩 상태를 false로 설정
}, [location]);

return (
    <Container>
        <Header>
            <Title>자유 게시판</Title>
            <SearchContainer>
                <SearchInput 
                    type="text" 
                    placeholder="검색어를 입력하세요" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    onKeyPress={handleSearchKeyPress} 
                />
                <SearchButton onClick={handleSearchButtonClick}>검색</SearchButton>
            </SearchContainer>
            <WriteButton to="/write">글쓰기</WriteButton>
        </Header>
        {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage> // 로딩 중 메시지 표시
        ) : (
            <PostList>
                {currentPosts.map((post, index) => (
                    <PostCard key={post.id} onClick={() => handlePostClick(post.id)}>
                        <PostHeader>
                            <PostAuthorInfo>
                                <PostAuthorAvatar src={Users} alt="Author Avatar" />
                                <div>
                                    <PostAuthor>{post.author}</PostAuthor>
                                    <PostDate>{post.year}.{post.month}.{post.day}</PostDate>
                                </div>
                            </PostAuthorInfo>
                            <PostIndex>{(currentPage - 1) * postsPerPage + index + 1}</PostIndex>
                        </PostHeader>
                        <PostTitle>{post.title}</PostTitle>
                        <PostExcerpt dangerouslySetInnerHTML={{ __html: (post.content || '').substring(0, 100) }} />
                        <PostFooter>
                            <IconContainer>
                                <Icon src={heart} alt="likes" />
                                <IconCount>{post.like}</IconCount>
                            </IconContainer>
                            <IconContainer>
                                <Icon src={watch} alt="views" />
                                <IconCount>{post.watch}</IconCount>
                            </IconContainer>
                            <CommentsCount>댓글수: {post.comment_number}</CommentsCount>
                        </PostFooter>
                    </PostCard>
                ))}
            </PostList>
        )}
        <PaginationContainer>
            <Pagination>
                {Array.from({ length: Math.ceil(allPosts.length / postsPerPage) }, (_, i) => (
                    <PageNumber key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
                        {i + 1}
                    </PageNumber>
                ))}
            </Pagination>
        </PaginationContainer>
    </Container>
);
};

export default FreeCommu;

const Container = styled.div`
    padding: 20px;
    background-color: #EFF8F3;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 가운데 정렬 */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px; /* 제목과 버튼을 포함하는 너비를 PostCard와 맞춤 */
    margin-bottom: 20px;
`;

const Title = styled.h1`
    color: #333;
    font-size: 2em;
`;

const WriteButton = styled(Link)`
    padding: 6px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

// LoadingMessage 컴포넌트 추가
const LoadingMessage = styled.div`
    font-size: 18px;
    color: #333;
    margin-top: 20px;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center; /* 가운데 정렬 */
`;

const PostCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s;
    width: 800px; /* 너비를 줄입니다. */
    &:hover {
        transform: translateY(-5px);
    }
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const PostAuthorInfo = styled.div`
    display: flex;
    align-items: center;
`;

const PostAuthorAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const PostAuthor = styled.p`
    margin: 0;
    font-weight: bold;
`;

const PostDate = styled.p`
    margin: 0;
    color: #999;
    font-size: 0.9em;
`;

const PostIndex = styled.span`
    font-size: 1.5em;
    color: #999;
`;

const PostTitle = styled.h2`
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
`;

const PostExcerpt = styled.p`
    margin: 10px 0;
    color: #666;
`;

const PostFooter = styled.div`
    display: flex;
    justify-content: flex-end;
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

const CommentsCount = styled.span`
    color: #4CAF50;
`;

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px; /* 너비를 PostCard와 맞춤 */
    margin-top: 20px; /* 상단 마진 추가 */
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
    width: 150px; /* 너비를 줄임 */
`;

const SearchButton = styled.button`
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1; /* flex-grow를 사용해 가운데 정렬 */
    margin: 20px 0;
`;

const PageNumber = styled.div`
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
    background-color: ${({ active }) => (active ? '#4CAF50' : '#fff')};
    color: ${({ active }) => (active ? '#fff' : '#333')};
    border: 1px solid #ddd;
    border-radius: 5px;
    &:hover {
        background-color: ${({ active }) => (active ? '#45a049' : '#f0f0f0')};
    }
`;
