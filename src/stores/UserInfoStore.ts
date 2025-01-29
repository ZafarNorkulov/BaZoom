import { action, makeAutoObservable } from "mobx";
import { getProfile, UserProfileContract } from "../services/UserService";
import {
  getReferalLink,
  getReferalStats,
  ReferalStatsContract,
} from "../services/ReferalService";
import { getPhotoCountForUser } from "../services/PhotoService";

class UserInfoStore {
  private initData: string;

  profile: UserProfileContract = {
    id: 0,
    name: "",
    balance: 0,
    has_verification_photo: false,
  };

  referalStats: ReferalStatsContract = {
    premium_count: 0,
    basic_count: 0,
    earned_tokens: 0,
  };

  referalLink: string = "";
  photoCount = 0;

  constructor(initData: string) {
    makeAutoObservable(this);
    this.initData = initData;
  }

  fetchProfileInfo() {
    getProfile(this.initData).then(
      action((profile) => {
        if (profile) {
          const {
            id,
            name,
            balance,
            has_verification_photo,
            profile_photo_url,
          } = profile;
          this.profile.id = id;
          this.profile.name = name;
          this.profile.balance = balance;
          this.profile.has_verification_photo = has_verification_photo;
          this.profile.profile_photo_url = profile_photo_url;
        }
      }),
    );
  }

  setHasVerificationPhoto(val: boolean) {
    this.profile.has_verification_photo = val;
  }

  fetchPhotoCount() {
    getPhotoCountForUser(this.initData).then(
      action((count) => {
        this.photoCount = count;
      }),
    );
  }

  fetchReferalStats() {
    getReferalStats(this.initData).then(
      action((stats) => {
        this.referalStats = stats;
      }),
    );
  }

  fetchReferalLink() {
    getReferalLink(this.initData).then(
      action((link) => (this.referalLink = link)),
    );
  }

  fetchAll() {
    this.fetchProfileInfo();
    this.fetchReferalStats();
    this.fetchReferalLink();
    this.fetchPhotoCount();
  }
}

export default UserInfoStore;
