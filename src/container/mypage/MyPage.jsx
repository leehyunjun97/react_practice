import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import axios from 'axios';

const MyPage = (props) => {
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);
  const [newNicknameState, setNewNicknameState] = useState('');

  const isNicknameEditHandler = () => {
    setIsNicknameEdit(!isNicknameEdit);
  };

  const editNickname = async () => {
    try {
      const editNickCom = await axios.put(
        `http://localhost:5000/users/update/nickname`,
        {
          id: userInfoData._id,
          nickName: newNicknameState,
        }
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // console.log(value);
  return (
    <div className='MyPage'>
      <div className='profile_img_section'>
        <img src='img/profile_dog.png' alt='profile_img' />
      </div>
      <div className='profile_section'>
        {isNicknameEdit ? (
          <>
            <input
              placeholder='수정할 닉네임 적어주3'
              name='newNickname'
              value={newNicknameState}
              onChange={(e) => {
                setNewNicknameState(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <span className='nickname_span'>{userInfoData.nickName}</span>
          </>
        )}

        <section>
          <span className='email_span'>{userInfoData.email}</span>
        </section>
        {isNicknameEdit ? (
          <>
            <button
              onClick={(e) => {
                if (window.confirm(`수정하시겠사와요?`)) {
                  // window.location.replace('mypage');
                  setUserInfo({ ...userInfo, nickName: newNicknameState });
                  editNickname();
                  isNicknameEditHandler();
                }
              }}
              style={{ right: '22%' }}
            >
              수정하기
            </button>
            <button onClick={isNicknameEditHandler}>수정취소</button>
          </>
        ) : (
          <>
            <button onClick={isNicknameEditHandler}>닉네임 수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;