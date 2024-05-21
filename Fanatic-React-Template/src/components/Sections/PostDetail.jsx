import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import emptyHeart from '../../../src/assets/img/emptyheart.png';
import heart from '../../../src/assets/img/heart.png';
import watch from '../../../src/assets/img/watch.png';
import Users from '../../../src/assets/img/users.png'; // 수정된 부분
import { useAuth } from '../Member/AuthContext'; 

const PostDetail = () => {
    const { postId } = useParams(); // URL에서 postId 가져옴
    const [post, setPost] = useState(null); // 게시글 상태
    const [comments, setComments] = useState([]); // 댓글 상태
    const [commentText, setCommentText] = useState(''); // 댓글 입력 상태
    const [likes, setLikes] = useState(0); // 좋아요 수 상태
    const [liked, setLiked] = useState(false); // 좋아요 눌렀는지 여부
    const { user, cookie } = useAuth(); // 로그인한 사용자 정보 가져오기
    const [views, setViews] = useState(0); // 조회수 상태
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPostData = async () => {
            console.log("Fetching post data with postId:", postId);
            try {
                const response = await fetch(`${process.env.REACT_APP_Server_IP}/content_view/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${cookie.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: postId }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    setComments(data.comment); // 댓글 데이터 설정
                    setLikes(data.like); // 좋아요 수 설정
                    setViews(data.watch); // 조회수 설정
                    setLiked(data.like_check === 0); // 사용자가 좋아요를 눌렀는지 여부 설정
                    console.log("-----------------------")
                    console.log(data.like_check === 0);
                    console.log("-----------------------")
                } else {
                    console.error('Failed to fetch post data');
                }
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_Server_IP}/comment_create/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${cookie.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: commentText, post_id: postId }), //댓글 내용, 게시글 ID
                });
    
                if (response.ok) {
                    const newComment = await response.json();
                    setComments([...comments, newComment]);
                    setCommentText('');
                    setPost(prevPost => ({
                        ...prevPost,
                        comment_number: prevPost.comment_number + 1
                    })); // 댓글 수 증가
                } else {
                    console.error('Failed to submit comment');
                }
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
        window.location.reload();
    };
    
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/comment_delete/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment_id: commentId }),
            });

            if (response.ok) {
                setComments(comments.filter(comment => comment.id !== commentId));
                setPost(prevPost => ({
                    ...prevPost,
                    comment_number: prevPost.comment_number - 1
                })); // 댓글 수 감소
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/post_like/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: postId }),
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data.like);
                setLiked(true);
            } else {
                console.error('Failed to like post');
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/post_dislike/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: postId }),
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data.like);
                setLiked(false);
            } else {
                console.error('Failed to dislike post');
            }
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };

    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
    };

    if (!post) {
        return <Container>게시글을 찾을 수 없습니다.</Container>;
    }

    return (
        <Container>
            <PostHeader>
                <Title>{post.title}</Title>
                <PostInfo>
                    <AuthorInfo>
                    <AuthorAvatar src={Users} alt="Author Avatar" />
                        <Author>{post.author}</Author>
                    </AuthorInfo>
                    <DateTime>
                        {post.year}.{formatNumber(post.month)}.{formatNumber(post.day)} {formatNumber(post.hour)}:{formatNumber(post.minute)}
                    </DateTime>
                    <Icons>
                        <IconContainer>
                            <Icon src={watch} alt="views" />
                            <IconCount>{views}</IconCount>
                        </IconContainer>
                        <IconContainer onClick={liked ? handleDislike : handleLike}>
                            <Icon src={liked ? heart : emptyHeart} alt="likes" />
                            <IconCount>{likes}</IconCount>
                        </IconContainer>
                    </Icons>
                </PostInfo>
            </PostHeader>
            <Content>
                <ReactMarkdown
                    children={post.content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                />
            </Content>
            <CommentSection>
                <CommentForm onSubmit={handleCommentSubmit}>
                    <CommentInput
                        type="text"
                        placeholder="댓글을 입력하세요..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <CommentButton type="submit">작성</CommentButton>
                </CommentForm>
                <CommentsList>
    {comments.map((comment, index) => (
        <Comment key={index}>
            <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>
                    {formatNumber(comment.month)}/{formatNumber(comment.day)} {formatNumber(comment.hour)}:{formatNumber(comment.minute)}
                </CommentDate>
            </CommentHeader>
            <CommentContent>
                {comment.content}
                {user.id === comment.user_id && (
                    <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
                )}
            </CommentContent>
        </Comment>
    ))}
</CommentsList>

            </CommentSection>
        </Container>
    );
};

export default PostDetail;

const Container = styled.div`
    padding: 40px;
    background-color: #fff;
    margin: 120px auto; /* 상단바에 가리지 않도록 조정 */
    max-width: 800px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const PostHeader = styled.div`
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
`;

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
`;

const AuthorAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Author = styled.p`
    margin: 0;
    color: #555;
    font-weight: bold;
`;

const DateTime = styled.p`
    margin: 0;
    color: #999;
    font-size: 14px;
`;

const Icons = styled.div`
    display: flex;
    gap: 10px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const IconCount = styled.span`
    font-size: 14px;
`;

const Content = styled.div`
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
`;

const CommentSection = styled.div`
    margin-top: 40px;
`;

const CommentForm = styled.form`
    display: flex;
    margin-bottom: 20px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
`;

const CommentButton = styled.button`
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

const CommentsList = styled.div`
    border-top: 1px solid #ddd; // 상단 테두리 추가
    border-bottom: 2px solid #ddd;
`;


const Comment = styled.div`
    padding: 0;
    background-color: #fff;
    height: 120px; // 각 댓글의 높이 고정
`;
const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #ddd; // 아래쪽 테두리 추가
    height: 30px; // 윗줄 높이 고정
`;

const CommentAuthor = styled.strong`
    font-weight: bold;
    color: #999; // 연한 회색
    font-size: 16px; // 글자 크기 줄임
`;

const CommentDate = styled.span`
    color: #999;
    font-size: 12px;
`;

const CommentContent = styled.div`
    padding: 20px 20px 30px 20px; // 텍스트 위치를 아래로 옮김
    background-color: #fff;
    position: relative;
    font-weight: 550; // 글자 굵기 증가
    font-size: 20px; // 글자 크기 증가
`;


const DeleteButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 7px; // 삭제 버튼을 오른쪽 하단에 배치
    &:hover {
        text-decoration: underline;
    }
`;