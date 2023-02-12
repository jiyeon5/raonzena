import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./HostFollowingGamesItem";
import styles from "./HostFollowingGames.module.css";
import { useSelector } from "react-redux";
import { FaUserTimes } from "react-icons/fa";

const HostFollowings = ({ HostFollowingsList, loading }) => {
  const [list, setList] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.userNo);
  async function getlist() {
    if (nowUserNo) {
      await axios({
        method: "get",
        url: `${baseUrl}live/followingRoom`,
      })
        .then((res) => {
          setList(res.data);
          if (res.data.length > 0) {
            const scrollChange = document.querySelector("#scrollChange");
            scrollChange.addEventListener(
              "wheel",
              (event) => {
                event.preventDefault();
                if (event.deltaY > 0) {
                  window.scrollBy({
                    left: 100,
                    behavior: "smooth",
                  });
                } else {
                  window.scrollBy({
                    left: -100,
                    behavior: "smooth",
                  });
                }
              },
              { passive: false }
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    getlist();
    // 가로 스크롤링 이벤트
    console.log("Hostfollowings 컴포넌트 getList 결과", list);
  }, []);

  // --------------------스웨거에서 확인한 데이터-------------------
  // 유저 이름    userName={gameRoomInfo.host.userName}
  // 유저 이미지  userImage={gameRoomInfo.host.userImageUrl}
  // 유저 레벨    level={gameRoomInfo.host.level}
  // 방 이름      roomTitle={gameRoomInfo.roomTitle}
  // 최대 인원 수 headcount={gameRoomInfo.headcount}
  // 비밀번호     password={gameRoomInfo.password}
  // 방 썸네일    roomImage={gameRoomInfo.imageName}

  return (
    <div className={styles.HostFollowingsList} id="scrollChange">
      {list.length > 0 ? (
        <>
          {list?.map((gameRoomInfo, idx) => {
            return (
              <Item
                key={idx}
                userName={gameRoomInfo.host.userName}
                userImage={gameRoomInfo.host.userImageUrl}
                level={gameRoomInfo.host.level}
                roomTitle={gameRoomInfo.roomTitle}
                headcount={gameRoomInfo.headcount}
                password={gameRoomInfo.password}
                roomImage={gameRoomInfo.imageName}
              />
            );
          })}
        </>
      ) : (
        <div >
          <FaUserTimes className={styles.NoGameRoomsImg} />
          <p className={styles.NoGameRoomsText}>
            지금 놀고 있는 친구가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default HostFollowings;
