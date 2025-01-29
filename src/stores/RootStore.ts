import UserInfoStore from "./UserInfoStore";

class RootStore {
  userStore: UserInfoStore;
  constructor(initData: string) {
    this.userStore = new UserInfoStore(initData);
    this.userStore.fetchAll();

  }
}

export default RootStore;
