import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAuth } from '../Member/AuthContext'; // useAuth 훅 임포트
import 'react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';


const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 var (--hover, #66bb6a);
  }
  100% {
    box-shadow: 0 0 0 2em transparent;
  }
`;

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  padding: 20px;
  margin-top: 100px;
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  background-color: #ccffcc;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  margin-top: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const buttonStyles = css`
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border: 2px solid #4CAF50;
  background-color: white;
  color: black;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-radius 0.3s;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(145deg, #4caf50, #66bb6a);
    background-color: #4CAF50;
    border-radius: 8px;
    animation: ${pulseAnimation} 1s;
    box-shadow: 0 0 0 2em transparent;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #007BFF;
    color: white;
    border-color: #007BFF;
  `}
`;

const Button = styled.button`
  ${buttonStyles}
  --hover: #66bb6a;
  &:hover, &:focus {
    animation: ${pulseAnimation} 1s;
    box-shadow: 0 0 0 2em transparent;
  }
`;

const DisabledButton = styled(Button)`
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #e0e0e0;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;

  &:before {
    content: '#';
  }

  &:after {
    content: '×';
    padding-left: 10px;
    font-weight: bold;
  }
`;

const HashTagBox = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  padding: 20px;
  font-size: 16px;
  width: 100%;
  min-height: 150px;
  word-wrap: break-word;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DiaryOutput = styled.div`
  width: 65%;
  min-height: 300px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  font-size: 16px;
  color: #333;
  position: relative;
  border-radius: 8px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: auto;

  h1,
  h2,
  h3 {
    font-size: 1.5em;
    color: #333;
  }

  em {
    font-weight: bold;
  }
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1px;
  margin-right: 50px;
`;

const GuidelineTitle = styled.h1`
  color: #50C878;
  text-align: center;
  margin-top: 50px;
`;

const GuidelineText = styled.p`
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;

const BlinkingGuideline = styled.div`
  animation: ${blinkAnimation} 1s linear infinite;
`;

const MarkdownPreview = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px;
  background-color: #f9f9f9;

  h1,
  h2,
  h3 {
    font-size: 1.5em;
    color: #333;
    font-weight: bold;
  }

  em {
    font-weight: normal;
  }
`;

const StyledReactMde = styled(ReactMde)`
  height: 1000px; /* 원하는 높이로 설정 */
  .mde-textarea-wrapper {
    height: calc(100% - 50px); /* 탭 높이를 제외한 높이 설정 */
  }
  .mde-text {
    height: 100%; /* 텍스트 영역의 높이를 100%로 설정 */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  animation: ${fadeIn} 0.3s;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalButton = styled(Button)`
  margin: 0 10px;
`;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

function DiaryPage() {
  const [formValues, setFormValues] = useState({
    who: '',
    when: '',
    where: '',
    what: '',
    how: '',
    why: '',
    others: '',
  });

  const [hashtags, setHashtags] = useState([]);
  const [showGuideline, setShowGuideline] = useState(true);
  const [showBlinkingGuideline, setShowBlinkingGuideline] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorText, setEditorText] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [isDiaryCreated, setIsDiaryCreated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(''); // title 상태 추가
  const { cookie } = useAuth();

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleTextChange = value => {
    setEditorText(value.split('\n'));
  };

  const placeholders = {
    who: 'ex) 내가, 친구랑',
    when: 'ex) 어제, 오늘, 점심에, 저녁에',
    where: 'ex) 학교에서, 집에서',
    what: 'ex) 공부를 했다, 과제를 했다',
    how: 'ex) 강의를 보면서, 멘토링을 하면서',
    why: 'ex) 시험 때문에, 프로젝트 때문에',
    others: 'ex) 기타 사항을 적어주세요',
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteTag = tag => {
    setHashtags(prev => prev.filter(t => t !== tag));
  };

  const generateHashtags = () => {
    const newTags = Object.values(formValues)
      .filter(value => value)
      .map(value => value.replace(/\s+/g, ''));
    setHashtags(newTags);
  };

  const parseMarkdown = text => {
    if (!text) return '';
    return text;
  };

  useEffect(() => {
    if (previewMode) {
      setEditorText(editorText);
    }
  }, [previewMode]);

  const createDiary = async () => {
    const newTags = Object.values(formValues)
      .filter(value => value)
      .map(value => value.replace(/\s+/g, ''));
    setHashtags(newTags);

    const markdownText = [
      `**Who:** ${formValues.who}`,
      `**When:** ${formValues.when}`,
      `**Where:** ${formValues.where}`,
      `**What:** ${formValues.what}`,
      `**How:** ${formValues.how}`,
      `**Why:** ${formValues.why}`,
      `${formValues.others}`
    ];
    setEditorText(markdownText);
    setShowBlinkingGuideline(true);

    const diaryData = {
      who: formValues.who,
      when: formValues.when,
      where: formValues.where,
      what: formValues.what,
      how: formValues.how,
      why: formValues.why,
      others: formValues.others,
      hashtags: newTags,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_Server_IP}/generate_daily/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedDiaryText = data.diaryText; // 리스트 그대로 받기
      setTitle(data.title);
      setEditorText(generatedDiaryText); // 리스트 그대로 설정
      setShowGuideline(false);
      setIsDiaryCreated(true);
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmUpload = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/daily_save/`, {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${cookie.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: editorText.join('\n'),
                check: 1, // 예 버튼 눌렀을 때는 1
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 성공적인 업로드 후 로직 추가
        console.log('Diary uploaded successfully');
    } catch (error) {
        console.error('Error uploading diary:', error);
    } finally {
        closeModal();
    }
};

const handleCancelUpload = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/daily_save/`, {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${cookie.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: editorText.join('\n'),
                check: 0, // 아니오 버튼 눌렀을 때는 0
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 성공적인 업로드 후 로직 추가
        console.log('Diary uploaded successfully');
    } catch (error) {
        console.error('Error uploading diary:', error);
    } finally {
        closeModal();
    }
};


  return (
    <Container>
      <MainContent>
        <InputColumn>
          {Object.keys(formValues).map(key => (
            <div key={key}>
              <InputLabel htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</InputLabel>
              <Input
                type="text"
                id={key}
                name={key}
                value={formValues[key]}
                onChange={handleChange}
                placeholder={placeholders[key]}
              />
            </div>
          ))}
          <Button onClick={generateHashtags}>해시태그 생성</Button>
          <HashTagBox>
            {hashtags.map((tag, index) => (
              <Tag key={index} onClick={() => handleDeleteTag(tag)}>
                {tag}
              </Tag>
            ))}
          </HashTagBox>
          <Button onClick={createDiary}>일기 생성</Button>
          <Button onClick={togglePreview}>
            {previewMode ? '일반 보기' : '마크다운 미리보기'}
          </Button>
        </InputColumn>
        <DiaryOutput>
  {showGuideline ? (
    showBlinkingGuideline ? (
      <BlinkingGuideline>
        <GuidelineTitle>Guide Line</GuidelineTitle>
        <GuidelineText>육하원칙에 해당하는 내용을 작성해주세요.</GuidelineText>
        <GuidelineText>작성한 후 해시태그 생성을 눌러주세요.</GuidelineText>
        <GuidelineText>해시태그가 생성된 후 해시태그를 바탕으로 일기 생성이 됩니다.</GuidelineText>
      </BlinkingGuideline>
    ) : (
      <>
        <GuidelineTitle>Guide Line</GuidelineTitle>
        <GuidelineText>육하원칙에 해당하는 내용을 작성해주세요.</GuidelineText>
        <GuidelineText>작성한 후 해시태그 생성을 눌러주세요.</GuidelineText>
        <GuidelineText>해시태그가 생성된 후 해시태그를 바탕으로 일기 생성이 됩니다.</GuidelineText>
      </>
    )
  ) : !previewMode ? (
    <StyledReactMde
      value={editorText.join('\n')}
      onChange={value => setEditorText(value.split('\n'))}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  ) : (
    <MarkdownPreview>
      <ReactMarkdown
        children={editorText.join('\n')}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          strong: ({ node, children, ...props }) => <span style={{ fontWeight: 'bold' }} {...props}>{children}</span>,
          h1: ({ node, children, ...props }) => <h1 style={{ fontWeight: 'bold' }} {...props}>{children}</h1>,
          h2: ({ node, children, ...props }) => <h2 style={{ fontWeight: 'bold' }} {...props}>{children}</h2>,
          h3: ({ node, children, ...props }) => <h3 style={{ fontWeight: 'bold' }} {...props}>{children}</h3>,
        }}
      />
    </MarkdownPreview>
  )}
</DiaryOutput>
      </MainContent>
      <UploadSection>
  {isDiaryCreated ? (
    <Button onClick={handleUpload}>업로드+</Button>
  ) : (
    <DisabledButton>업로드+</DisabledButton>
  )}
</UploadSection>
      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <ModalText>이 일기는 마이페이지에 저장이 됩니다. 자유 게시판에도 저장하시겠습니까?</ModalText>
            <ModalButton onClick={handleConfirmUpload}>네</ModalButton>
            <ModalButton onClick={handleCancelUpload}>아니오</ModalButton>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default DiaryPage;
