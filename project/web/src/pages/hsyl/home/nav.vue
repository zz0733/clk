<template>
  <div class="hsyl-home-nav">
        <div class="wrapper">

                       <div class="nav-caidan">
                             <ul>
                                 <li v-for="(item,i) in navlist" :class="{navActive:navActive ==i}" :key="i" @click="toggleNav(i,item.link)">{{item.title}}</li>
                             </ul>
                       </div>

                    <div class="logo">
                          <a href="javascript:void(0)" @click="goHome">
                            <img src="/static/hsyl/img/logo.png" alt="花生娱乐">
                         </a>
	                 	</div>
         
                    
                     
        </div>
       
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      navlist: [
        { title: "网站首页", link: "/home" },
        { title: "传统彩票", link: "/plays/hall" },
        // { title: "官方彩票" },
        // { title: "香港彩" ,link: "/home/tradition"},
        { title: "真人视讯", link: "/home/live" },
        { title: "棋牌游戏", link: "/home/qipai" },
        { title: "体育投注", link: "/home/tiyu" },
        { title: "电子游艺", link: "/home/games" },
        { title: "捕鱼达人", link: "/home/buyu" },
        { title: "优惠活动", link: "/home/youhui" },
        { title: "在线客服", link: "kefu" }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
      this.$store.commit("hsyl/setNav", 0);
    },
    toggleNav(i, link) {
      if (link == "kefu") {
        // let url = JSON.parse(localStorage.getItem("config")).service[0].url;
        window.open(
          "http://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=944333&configID=41469&jid=1980520380"
        );
        return false;
      }
      if (link == "/plays/hall") {
        window.open("#/plays/hall");
        return false;
      }

      this.$store.commit("hsyl/setNav", i);
      if (i == 1 || i == 2) {
        this.$router.push({
          path: link,
          query: {
            id: i
          }
        });
        return false;
      }

      this.$router.push(link);
    }
  },
  computed: {
    navActive() {
      return this.$store.state.hsyl.navActive;
    }
  },
  store
};
</script>
