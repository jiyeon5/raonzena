import React, { useEffect, useState } from "react";
import styles from "./GameFrameLeft.module.css";
import CharacterQuiz from "../game/CharacterQuiz";
import Lotte from "../game/Lotto";
import GameFrameProgress from "./GameFrameProgress";
import Catchmind from "../game/catchmind";
import ShoutInSilence from "../game/ShoutInSilence";
import Seeking from "../game/Seeking";
import axios from "axios";
import { useSelector } from "react-redux";

function GameFrameLeft({
  start,
  result,
  gamename,
  setResult,
  openvidu,
  host,
  roomNo,
  setEnd,
  publisher,
  setStart
}) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const [newGameScore, setNewGameScore] = useState([]);
  const [userList, setUserList] = useState([
    {
      userNo: 1,
      userId: "123456",
      userName: "홍영민",
      exp: 50,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 2,
      userId: "123456",
      userName: "윤수희",
      exp: 40,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 3,
      userId: "123456",
      userName: "최지연",
      exp: 30,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 4,
      userId: "123456",
      userName: "윤수희",
      exp: 20,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 7,
      userId: "2657509460",
      userName: "임길현",
      exp: 0,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
  ]);
  // 내일 확인 해 보자
  // const userListupdate = () => {
  //   axios({
  //     method: "GET",
  //     url: `${baseUrl}games/${roomNo}`,
  //   })
  //     .then((res) => {
  //       setUserList(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }
  // useEffect (() => {
  //   userListupdate()
  // },[openvidu.subscribe])

  // const [liveScoreData, setLiveScoreData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(`${baseUrl}games/liveScore`);
  //       setLiveScoreData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [userList]);

  // console.log(liveScoreData);
  const axiosScore = () => {
    axios({
      method: "GET",
      url: `${baseUrl}games/liveScore/${roomNo}`,
    })
      .then((res) => {
        console.log("으아아아아아아아아아아아아아아아악");
        console.log(res.data); // Add code to execute here
        setUserList(res.data.userData);
      })
      .catch((error) => console.log(error));
  }
  useEffect(()=>{
    axiosScore()
  },[]);
  // useEffect(() => {
  //   const sendLiveScore = async (roomNo, userList) => {
  //     const formattedList = userList.map((user) => ({
  //       userNo: user[0],
  //       exp: user[1],
  //     }));
  //     try {
  //       await axios.post(`${baseUrl}games/liveScore`, {
  //         roomNo,
  //         userList: formattedList,
  //       });
  //       console.log("Live score sent successfully");
  //     } catch (error) {
  //       console.error("Error sending live score:", error);
  //     }
  //   };
  //   sendLiveScore(roomNo, userList); // Call the sendLiveScore function here
  // }, [userList]);

  useEffect(()=>{
    setNewGameScore(userList.map(user => [user.userNo, user.gameScore]));

    axios({
      method: "POST",
      url: `${baseUrl}games/liveScore/`,
      data: { roomNo: roomNo, userData: newGameScore },
    })
      .then((res) => {
        console.log("dkdkdkdkd");
        console.log(res.data);
        axiosScore()
      })
      .catch((error) => console.log(error));
  },[userList]);

  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.userNo);
      if (data.gamename === "joker" && data.clicked === 1) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return { ...user, exp: user.exp + (100 - user.exp) };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 2) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp + 5 >= 100 ? 100 : user.exp + 5,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 3) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp + 10 >= 100 ? 100 : user.exp + 10,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 4) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp - 5 <= 0 ? 0 : user.exp - 5,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 5) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp - 10 <= 0 ? 0 : user.exp - 10,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename !== "joker") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.exp + data.score <= 0) {
                return { ...user, exp: 0 };
              } else if (user.exp + data.score >= 100) {
                return { ...user, exp: 100 };
              } else {
                return { ...user, exp: user.exp + data.score };
              }
            }
            return user;
          })
        );
      }
    });
  }, []);

  userList.sort(function (a, b) {
    return b.points - a.points;
  });
  return (
    <div className={styles.leftcontainer}>
      <div>
        <div className={styles.container}>
          {gamename === "imagetheme" && (
            <Seeking
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setEnd={setEnd}
              setStart={setStart}
            />
          )}

          {gamename === "objectfast" && (
            <Seeking
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setEnd={setEnd}
              setStart={setStart}
            />
          )}
          {gamename === "catchmind" && (
            <Catchmind
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
            />
          )}
          {gamename === "talkingsilence" && (
            <ShoutInSilence
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              userList={userList}
              publisher = {publisher}
            />
          )}
          {gamename === "personquiz" && (
            <CharacterQuiz
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setEnd={setEnd}
            />
          )}
          {gamename === "joker" && (
            <Lotte
              start={start}
              result={result}
              openvidu={openvidu}
              host={host}
            />
          )}
        </div>
        <div className={styles.progressframe}>
          <div>
            {console.log("업데이트 하기 후 유저 리스트!!!", userList[4])}
            {userList.slice(0, 3).map((user, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img
                      alt="img"
                      src={user.userImage}
                      className={styles.img}
                    />
                    <span className={styles.font2}>{user.userName}</span>
                  </div>
                  <GameFrameProgress user={user} />
                </div>
              );
            })}
          </div>
          <div>
            {userList.slice(3, 6).map((user, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img
                      alt="img"
                      src={user.userImage}
                      className={styles.img}
                    />
                    <span className={styles.font2}>{user.userName}</span>
                  </div>
                  <GameFrameProgress user={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameFrameLeft;
