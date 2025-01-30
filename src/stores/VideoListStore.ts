import ListStore from "./ListStore";
import { getUserVideos, VideoContract, VideoResponseContract } from "../services/VideoService";

// ListStore generik interfeysiga mos keladigan umumiy javob strukturasini ta’minlash
interface ListResponseContract<T> {
  data: T[];
  total: number;
}

class VideoListStore extends ListStore<VideoContract> {
  constructor(initData: string) {
    super(initData);
  }

  protected async _fetchItems(limit: number, offset: number): Promise<ListResponseContract<VideoContract>> {
    const response: VideoResponseContract = await getUserVideos(this.initData, limit, offset);

    return {
      data: response.items, 
      total: response.total, 
    };
  }
}

export default VideoListStore;
