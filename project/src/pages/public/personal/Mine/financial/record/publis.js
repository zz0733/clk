import UserService from "@/service/public/UserService.js";
import store from '@/vuex/store'
import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m";
const mixin = {
    data: function () {
        return {
            detail: {},
            mescroll: null,
            orderHis: [],
            screedData: [],
            lotteryDetail: false,
            lotteryData: [],
        }
    },
    methods: {
        // 查看詳情
        getDetail(item) {
            this.detail = item;
            this.lotteryDetail = true;
        },
        // 顯示選擇框
        showPicker() {
            this.picker.show();
            // let flag = this.$isMobile();           
        },
        // 下注記錄篩選
        getScreed(type) {
            JSON.parse(localStorage.getItem("list")).forEach(v => {
                if (v.type == type) {
                    this.screedData = v.list;
                }
            });
            // this.$loading(false);
        },
        //  初始化篩選框
        createPicker() {
            this.picker = this.$createPicker({
                title: "请选择",
                data: [this.screedData],
                alias: {
                    value: "platform",
                    text: "name"
                },
                onSelect: (selectedVal, selectedIndex, selectedText) => {
                    this.platform = selectedVal[0]=="all"?'':selectedVal[0];
                    this.mescroll.destroy();
                    this.newMescroll();
                }
            });
        },
        // 初始化滾動插件
        newMescroll() {
            this.mescroll = new MeScroll("mescroll", {
                up: {
                    callback: this.upCallback,
                    isBounce: false,
                    toTop: {
                        offset: 1000
                    },
                    empty: {
                        icon: "../../../../../../assets/img/public/image/common/personal/userInfo/no-more.png",
                        tip: "亲,暂无相关数据哦~"

                    }
                }
            });
        },
        // 上拉回掉函數
        upCallback(page) {
          // console.log(page)
            this.getListDataFromNet(
                page.num,
                // page.size,
                curPageData => {
                    if (curPageData.data.length == 0 && page.num == 1) {
                        this.flag = true;
                        this.mescroll.endErr();
                    } else {
                        this.flag = false;
                    }

                    if (page.num == 1) this.lotteryData = [];
                    //更新列表数据
                    this.lotteryData = this.lotteryData.concat(curPageData.data);
                    this.$loading(false);

                    this.mescroll.endByPage(
                        curPageData.data ? curPageData.data.length : 0,
                        curPageData.per_page
                    );
                },
                () => {
                    this.mescroll.endErr();
                }
            );
        },
    },

    destroyed() {
      this.$loading(false);
      this.mescroll.destroy();
    },
    store
}

export default mixin;


