import styles from "./ProfilePage.module.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import ProfilePagePhoto from "../../components/ProfilePage/ProfilePagePhoto";
import ProfilePageInfo from "../../components/ProfilePage/ProfilePageInfo";
import { Transition } from "react-transition-group";
import ProfileModal from "../../components/ProfilePage/ProfileModal";
import { useState } from "react";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [nowContent, setNowContent] = useState();
  const [follower, setfollower] = useState();
  const [following, setfollowing] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setNowContent();
      setfollower();
      setfollowing();
    }, 300);
  };

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.background2}>
          <div className={styles.background3}>
            <ProfilePageInfo
              handleOpen={handleOpen}
              setfollower={setfollower}
              setfollowing={setfollowing}
            />
            <ProfilePagePhoto
              handleOpen={handleOpen}
              setNowContent={setNowContent}
            />
          </div>
        </div>
        <Footer />
        <Transition unmountOnExit in={open} timeout={500}>
          {(state) => (
            <ProfileModal
              show={state}
              handleClose={handleClose}
              nowContent={nowContent}
              follower={follower}
              following={following}
            />
          )}
        </Transition>
      </div>
    </>
  );
}

export default ProfilePage;