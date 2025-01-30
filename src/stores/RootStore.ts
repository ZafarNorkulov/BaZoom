import UserInfoStore from "./UserInfoStore";
import VideoListStore from "./VideoListStore";

class RootStore {
  userStore: UserInfoStore;
  videoStore: VideoListStore;
  constructor(initData: string) {
    this.userStore = new UserInfoStore(initData);
    this.userStore.fetchAll();

    this.videoStore = new VideoListStore(initData);
    this.videoStore.fetchNewItems();
  }
}

export default RootStore;
