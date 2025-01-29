import { action, computed, makeObservable, observable } from "mobx";

interface ListResponseContract<T> {
  total: number;
  data: T[];
}

abstract class ListStore<T> {
  total?: number;
  limit = 10;
  offset: number = 0;
  items: T[] = [];
  loading = false;
  protected initData: string;

  constructor(initData: string) {
    this.initData = initData;
    makeObservable(this, {
      items: observable,
      loading: observable,
      offset: observable,
      hasMore: computed,
      fetchNewItems: action,
    });
  }

  get hasMore() {
    const res = !this.total || this.offset < this.total;
    console.log("hasMore", res);
    return res;
  }

  protected abstract _fetchItems(
    limit: number,
    offset: number,
  ): Promise<ListResponseContract<T>>;

  fetchNewItems() {
    if (!this.hasMore) throw new Error("No more items to fetch");
    this.loading = true;
    this._fetchItems(this.limit, this.offset)
      .then(
        action(({ total, data }) => {
          this.items = [...this.items, ...data];
          this.offset += data.length;
          this.total = total;
        }),
      )
      .finally(
        action(() => {
          this.loading = false;
        }),
      );
  }
}

export default ListStore;
export type { ListResponseContract };
