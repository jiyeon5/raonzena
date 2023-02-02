import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GameRooms from "../../components/GameRoom/GameRoom";
import FollowingList from "../../components/Followings/FollowingList";
import HostFollowings from "../../components/Followings/HostFollowings";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";

const LivePage = () => {
  const { state } = useLocation();

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.background2}>
          <div className={styles.background3}>
            <div className={styles.NowPlayingTitle}>
              {state === null ? (
                <>
                  {`Now `}
                  <b id={styles.pinkcolor}> Playing</b>
                </>
              ) : (
                <>
                  {`Search `}
                  <b id={styles.pinkcolor}> Result</b>
                  <span className={styles.searchWord}>{state}</span>
                </>
              )}
              <GameRooms className={styles.center} searchWord={state}/>
            </div>
          </div>
          <div className={styles.displayFlex}>
            <div className={styles.HostfollowingsList}>
              {`Followings' `}
              <b id={styles.pinkcolor}> Rooms</b>
              <div>
                <HostFollowings/>
              </div>
            </div>
            <div className={styles.followingsList}>
              <div className={styles.No}>
                {`Your`}
                <b id={styles.pinkcolor}> Followings</b>
                <FollowingList/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LivePage;
