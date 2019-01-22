<template>
  <div class="container" ref="container" :class="{'active':ifShowNav}">
    <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
    <div class="all-container-wrap">
      <transition name="fade">
        <div class="all-container-betArea">
          <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy'
                             :childNeedMess='childNeedMess'></vp-lottery-result>
          <vp-nav :sideReady='sideReady' :childNeedMess='childNeedMess' :side='side'
                  v-on:child-say="getListData"></vp-nav>
          <div class="betArea-decial-box">
            <div class="lottery-cont" ref="lottery-cont">
              <div class="list-tap" v-if="sideSelect=='特码'">
                <div @click="teMolFc('te','特码A')" :class="{'active':active.teMol=='特码A'}">特码A</div>
                <div @click="teMolFc('te','特码B')" :class="{'active':active.teMol=='特码B'}">特码B</div>
              </div>
              <div class="list-tap" v-if="sideSelect=='正码'">
                <div @click="teMolFc('zheng','正码A')" :class="{'active':active.zhengMol=='正码A'}">正码A</div>
                <div @click="teMolFc('zheng','正码B')" :class="{'active':active.zhengMol=='正码B'}">正码B</div>
              </div>
              <div class="list-tap" v-if="sideSelect=='正码特'">
                <div @click="teMolFc('zhengT','正1特')" :class="{'active':active.zhengTMol=='正1特'}">正1特</div>
                <div @click="teMolFc('zhengT','正2特')" :class="{'active':active.zhengTMol=='正2特'}">正2特</div>
                <div @click="teMolFc('zhengT','正3特')" :class="{'active':active.zhengTMol=='正3特'}">正3特</div>
                <div @click="teMolFc('zhengT','正4特')" :class="{'active':active.zhengTMol=='正4特'}">正4特</div>
                <div @click="teMolFc('zhengT','正5特')" :class="{'active':active.zhengTMol=='正5特'}">正5特</div>
                <div @click="teMolFc('zhengT','正6特')" :class="{'active':active.zhengTMol=='正6特'}">正6特</div>
              </div>
              <div class="list-tap" v-if="sideSelect=='连码'">
                <div @click="teMolFc('lianma','三全中')" :class="{'active':active.lianmaMol=='三全中'}">三全中</div>
                <div @click="teMolFc('lianma','三中二')" :class="{'active':active.lianmaMol=='三中二'}">三中二</div>
                <div @click="teMolFc('lianma','二全中')" :class="{'active':active.lianmaMol=='二全中'}">二全中</div>
                <div @click="teMolFc('lianma','二中特')" :class="{'active':active.lianmaMol=='二中特'}">二中特</div>
                <div @click="teMolFc('lianma','特串')" :class="{'active':active.lianmaMol=='特串'}">特串</div>
                <div @click="teMolFc('lianma','四中一')" :class="{'active':active.lianmaMol=='四中一'}">四中一</div>
              </div>
              <div class="list-tap" v-if="sideSelect=='过关'">
                <div @click="teMolFc('guoGuan','正码一')" :class="{'active':active.guoGuanMol=='正码一'}">正码一</div>
                <div @click="teMolFc('guoGuan','正码二')" :class="{'active':active.guoGuanMol=='正码二'}">正码二</div>
                <div @click="teMolFc('guoGuan','正码三')" :class="{'active':active.guoGuanMol=='正码三'}">正码三</div>
                <div @click="teMolFc('guoGuan','正码四')" :class="{'active':active.guoGuanMol=='正码四'}">正码四</div>
                <div @click="teMolFc('guoGuan','正码五')" :class="{'active':active.guoGuanMol=='正码五'}">正码五</div>
                <div @click="teMolFc('guoGuan','正码六')" :class="{'active':active.guoGuanMol=='正码六'}">正码六</div>
              </div>
              <div class="list-tap" v-if="sideSelect=='色波'">
                <div @click="teMolFc('seBo','色波')" :class="{'active':active.seBoMol=='色波'}">色波</div>
                <div @click="teMolFc('seBo','红波')" :class="{'active':active.seBoMol=='红波'}">红波</div>
                <div @click="teMolFc('seBo','蓝波')" :class="{'active':active.seBoMol=='蓝波'}">蓝波</div>
                <div @click="teMolFc('seBo','绿波')" :class="{'active':active.seBoMol=='绿波'}">绿波</div>
              </div>
              <div v-if="sideSelect=='连肖'">
                <div class="horizontal-scroll-list-wrap">
                  <cube-scroll :data="shengXiaoLianList" direction="horizontal">
                    <ul class="list-wrapper">
                      <li :class="{'active':item.name==shengXiaoLianActive}" @click="shengXiaoLianFc(index,item.name)"
                          class="list-item cube-scroll-lianMa-item" :key="index"
                          v-for="(item,index) in shengXiaoLianList">
                        <div>{{item.name.substring(0,3)}}</div>
                        <div>({{item.name.substring(3,item.name.length)}})</div>
                      </li>
                    </ul>
                  </cube-scroll>
                </div>
              </div>
              <div v-if="sideSelect=='连尾'">
                <div class="horizontal-scroll-list-wrap">
                  <cube-scroll :data="weiShuLianList" direction="horizontal">
                    <ul class="list-wrapper">
                      <li :class="{'active':item.name==weiShuLianActive}" @click="weiShuLianFc(index,item.name)"
                          class="list-item cube-scroll-lianMa-item lianWei" :key="index"
                          v-for="(item,index) in weiShuLianList">
                        <div>{{item.name.substring(0,3)}}</div>
                        <div>({{item.name.substring(3,item.name.length)}})</div>
                      </li>
                    </ul>
                  </cube-scroll>
                </div>
              </div>
              <div v-if="sideSelect=='合肖'">
                <van-tabs @click="heXiaoFc" class="hall-container-header heXiao-van">
                  <van-tab :key="index" v-for="(item,index) in heXiaoList" :title="item.name">
                  </van-tab>
                </van-tabs>
              </div>
              <div v-if="sideSelect=='全不中'">
                <van-tabs @click="quanBuZhongFc" class="hall-container-header heXiao-van quanBuZhong-van">
                  <van-tab :key="index" v-for="(item,index) in quanBuZhongList" :title="item.name">
                  </van-tab>
                </van-tabs>
              </div>
              <!-- <cube-scroll ref="scroll" :data="showList.list" @scroll="scroll" :scroll-events="scrollEvents"> -->
              <!-- 特码 -->
              <div class="wrap" v-if="sideSelect=='特码'">
                <div v-if="outItem.small==active.teMol" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <ul class="lottery-ul ballPadding">
                    <li :class="{
                                                'fourSquare':
                                                outItem.title=='拆分'
                                            }" @click="addActiveFc(intItem)" class="lottery-item te" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball ballTe">{{intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>

                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 正码 -->
              <div class="wrap" v-if="sideSelect=='正码'">
                <div v-if="outItem.small==active.zhengMol" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <!-- <div class="lottery-title">{{outItem.small}}</div> -->
                  <ul class="lottery-ul ballPadding">
                    <li :class="{
                                                'fourSquare':
                                                outItem.title=='拆分'
                                            }" @click="addActiveFc(intItem)" class="lottery-item te" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball ballTe">{{intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 正特码 -->
              <div class="wrap" v-if="sideSelect=='正码特'">
                <div v-if="outItem.small==active.zhengTMol" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <!-- <div class="lottery-title">{{outItem.small}}</div> -->
                  <ul class="lottery-ul ballPadding">
                    <li :class="{
                                                'fourSquare':
                                                outItem.title=='拆分'
                                            }" @click="addActiveFc(intItem)" class="lottery-item te" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball ballTe">{{intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd ">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 正码1-6 -->
              <div class="wrap" v-if="sideSelect=='正码1-6'">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}</div>
                  <ul class="lottery-ul one-to-six">
                    <li @click="addActiveFc(intItem)" class="lottery-item fourSquare one-to-six-child" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{ 'active':intItem.state}" class="ball">{{intItem.name}}</div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 连码-->
              <div class="wrap" v-if="sideSelect=='连码'">
                <div v-if='active.lianmaMol==outItem.small' class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <!-- <div class="lottery-title">{{outItem.small}}</div> -->
                  <ul class="lottery-ul ballPadding">
                    <li @click="addActiveFc(intItem)" class="lottery-item te" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 过关-->
              <div class="wrap" v-if="sideSelect=='过关'">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}</div>
                  <ul class="lottery-ul">
                    <li @click="addActiveFc(intItem)" class="lottery-item fourSquare " :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{ 'active':intItem.state}" class="ball">{{intItem.name}}</div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 全不中-->
              <div class="wrap" v-if="sideSelect=='全不中'">
                <div v-if="active.quanBuZhongMol==outItem.small" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <!-- <div class="lottery-title">{{outItem.small}}</div> -->
                  <ul class="lottery-ul ballPadding">
                    <li @click="addActiveFc(intItem)" class="lottery-item te " :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 尾数,特肖,一肖-->
              <div class="wrap" v-if="
                               sideSelect=='尾数'||
                               sideSelect=='特肖'||
                               sideSelect=='一肖'
                            ">
                <div @click="weiShuActiveFc(outItem)" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}　{{outItem.odds}}</div>
                  <ul class="lottery-ul trail">
                    <li class="lottery-item te" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.code}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 连肖-->
              <div class="wrap" v-if="
                               sideSelect=='连肖'
                            ">
                <div v-if="outItem.secondTitle==active.shengXiaoLianMol" @click="weiShuActiveFc(outItem)" class="list"
                     :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}　{{outItem.odds}}</div>
                  <ul class="lottery-ul trail">
                    <li class="lottery-item te" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.code}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 连尾-->
              <div class="wrap" v-if="
                               sideSelect=='连尾'
                            ">
                <div v-if="outItem.secondTitle==active.weiShuLianMol" @click="weiShuActiveFc(outItem)" class="list"
                     :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}　{{outItem.odds}}</div>
                  <ul class="lottery-ul trail">
                    <li class="lottery-item te" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.code}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!--合肖-->
              <div class="wrap" v-if="
                               sideSelect=='合肖'
                            ">
                <div v-if="outItem.secondTitle==active.heXiaoMol" @click="weiShuActiveFc(outItem)" class="list"
                     :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}　{{outItem.odds}}</div>
                  <ul class="lottery-ul trail">
                    <li class="lottery-item te" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{
                                                    blue:+intItem.code==3&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==15&&intItem.state||
                                                    +intItem.code==25&&intItem.state||+intItem.code==31&&intItem.state||+intItem.code==37&&intItem.state||
                                                    +intItem.code==41&&intItem.state||+intItem.code==47&&intItem.state||+intItem.code==4&&intItem.state||
                                                    +intItem.code==10&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==20&&intItem.state||
                                                    +intItem.code==26&&intItem.state||+intItem.code==36&&intItem.state||+intItem.code==42&&intItem.state||
                                                    +intItem.code==48&&intItem.state,
                                                    green:+intItem.code==5&&intItem.state||+intItem.code==11&&intItem.state||+intItem.code==17&&intItem.state||
                                                    +intItem.code==21&&intItem.state||+intItem.code==27&&intItem.state||+intItem.code==33&&intItem.state||
                                                    +intItem.code==39&&intItem.state||+intItem.code==43&&intItem.state||+intItem.code==6&&intItem.state||
                                                    +intItem.code==16&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==28&&intItem.state||
                                                    +intItem.code==32&&intItem.state||+intItem.code==38&&intItem.state||+intItem.code==44&&intItem.state||
                                                    +intItem.code==49&&intItem.state,
                                                    red:+intItem.code==1&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==13&&intItem.state||
                                                    +intItem.code==19&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==29&&intItem.state||
                                                    +intItem.code==35&&intItem.state||+intItem.code==45&&intItem.state||+intItem.code==2&&intItem.state||
                                                    +intItem.code==8&&intItem.state||+intItem.code==12&&intItem.state||+intItem.code==18&&intItem.state||
                                                    +intItem.code==24&&intItem.state||+intItem.code==30&&intItem.state||+intItem.code==34&&intItem.state||
                                                    +intItem.code==40&&intItem.state||+intItem.code==46&&intItem.state,
                                                    nblue:+intItem.code==3||+intItem.code==9||+intItem.code==15||
                                                    +intItem.code==25||+intItem.code==31||+intItem.code==37||
                                                    +intItem.code==41||+intItem.code==47||+intItem.code==4||
                                                    +intItem.code==10||+intItem.code==14||+intItem.code==20||
                                                    +intItem.code==26||+intItem.code==36||+intItem.code==42||
                                                    +intItem.code==48,
                                                    ngreen:+intItem.code==5||+intItem.code==11||+intItem.code==17||
                                                    +intItem.code==21||+intItem.code==27||+intItem.code==33||
                                                    +intItem.code==39||+intItem.code==43||+intItem.code==6||
                                                    +intItem.code==16||+intItem.code==22||+intItem.code==28||
                                                    +intItem.code==32||+intItem.code==38||+intItem.code==44||
                                                    +intItem.code==49,
                                                    nred:+intItem.code==1||+intItem.code==7||+intItem.code==13||
                                                    +intItem.code==19||+intItem.code==23||+intItem.code==29||
                                                    +intItem.code==35||+intItem.code==45||+intItem.code==2||
                                                    +intItem.code==8||+intItem.code==12||+intItem.code==18||
                                                    +intItem.code==24||+intItem.code==30||+intItem.code==34||
                                                    +intItem.code==40||+intItem.code==46,
                                                    'active':intItem.state
                                                }" class="ball">{{intItem.code}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">{{intItem.odds}}</div>
                    </li>
                  </ul>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
              <!-- 色波-->
              <div class="wrap" v-if="sideSelect=='色波'">
                <div v-if="active.seBoMol==outItem.small" class="list style-seBo-box" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <div @click="addActiveFc(intItem)" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                    <div class="lottery-title">{{intItem.code}}　{{intItem.odds}}</div>
                    <ul class="lottery-ul">
                      <li :key=thirdIndex v-for="(thirdItem,thirdIndex) in intItem.list"
                          class="lottery-item  te style-seBo">
                        <div :class="{
                                                            blue:intItem.code.includes('蓝')&&intItem.state,
                                                            green:intItem.code.includes('绿')&&intItem.state,
                                                            red:intItem.code.includes('红')&&intItem.state,
                                                            nblue:intItem.code.includes('蓝'),
                                                            ngreen:intItem.code.includes('绿'),
                                                            nred:intItem.code.includes('红')
                                                            }" class="ball fontSebo">{{thirdItem}}
                        </div>
                        <!-- <div :class="{'active':intItem.state}" class="odd">{{thirdItem}}</div> -->
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="lottery-gasket-liuhe"></div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
              </div>
            </div>
          </div>
          <cube-popup :style="{position:position }" type="vp-submit" ref="mySumit">
            <transition name="fade">
              <vp-lottery-submit :childNeedMess="childNeedMess" v-if="showSubmit" v-on:hidePopup="hidePopup"
                                 v-on:allSubmit="allSubmit"
                                 :submitList="submitListShow.length?submitListShow:submitList" :total="total"
                                 :sideSelect="sideSelect" :childSelect="active.heXiaoMol"></vp-lottery-submit>
            </transition>
          </cube-popup>
          <transition name="fade">
            <vp-lottery-sec-money v-show="total.num&&total.num>0" v-on:sec-money-say="reset" v-on:showPopup="showPopup"
                                  v-on:calculate="calculate" :total=total ref="selMoney"></vp-lottery-sec-money>
          </transition>
          <span @touchmove.prevent v-show="closeMaskStaue" class="closeFix">已封盘</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import childIndex from '../../public'

  export default {
    mixins: [childIndex],
    data () {
      return {
        active: {
          teMol: '特码A',
          zhengMol: '正码A',
          zhengTMol: '正1特',
          lianmaMol: '二全中',
          guoGuanMol: '正码一',
          shengXiaoLianMol: '二肖连中',
          weiShuLianMol: '二尾连中',
          heXiaoMol: '二肖',
          quanBuZhongMol: '五不中',
          seBoMol: '色波'
        },
        shengXiaoLianActive: '二肖连中',
        weiShuLianActive: '二尾连中',
        shengXiaoLianList: [{
          name: '二肖连中'
        },
          {
            name: '三肖连中'
          },
          {
            name: '四肖连中'
          },
          {
            name: '五肖连中'
          },
          {
            name: '二肖连不中'
          },
          {
            name: '三肖连不中'
          },
          {
            name: '四肖连不中'
          }
        ],
        weiShuLianList: [{
          name: '二尾连中'
        },
          {
            name: '三尾连中'
          },
          {
            name: '四尾连中'
          },
          {
            name: '二尾连不中'
          },
          {
            name: '三尾连不中'
          },
          {
            name: '四尾连不中'
          }
        ],
        heXiaoList: [{
          name: '二肖'
        },
          {
            name: '三肖'
          },
          {
            name: '四肖'
          },
          {
            name: '五肖'
          },
          {
            name: '六肖'
          },
          {
            name: '七肖'
          },
          {
            name: '八肖'
          },
          {
            name: '九肖'
          },
          {
            name: '十肖'
          },
          {
            name: '十一肖'
          }
        ],
        quanBuZhongList: [{
          name: '五不中'
        },
          {
            name: '六不中'
          },
          {
            name: '七不中'
          },
          {
            name: '八不中'
          },
          {
            name: '九不中'
          },
          {
            name: '十不中'
          },
          {
            name: '十一不中'
          },
          {
            name: '十二不中'
          }
        ],
        submitListShow: []
      }
    },
    methods: {
      //连肖
      shengXiaoLianFc (index, title) {
        this.teMolFc('shengXiaoLian', title)
        this.shengXiaoLianActive = title
      },
      //连尾
      weiShuLianFc (index, title) {
        this.teMolFc('weiShuLian', title)
        this.weiShuLianActive = title
      },
      //合肖
      heXiaoFc (index, title) {
        this.teMolFc('heXiao', title)
      },
      //全不中
      quanBuZhongFc (index, title) {
        this.teMolFc('quanBuZhong', title)
      },
      //特AB选择
      teMolFc (str, datas) {
        this.active[`${str}Mol`] = datas
        this.reset('no-all')
      },
      //导航向上传的参数
      getListData (datas) {
        //如果已经有了，就不要进行下一步
        if (this.sideSelect == datas) return false
        //滚动顶部
        this.$refs['lottery-cont'].scrollTop = 0

        //记录当前选中，样式用
        this.sideSelect = datas
        //切换还原所有
        this.reset()
        //重新渲染list（并拆分特殊的第一到第n球的大小单双）
        this.side.list.forEach((outItem, _v1) => {
          if (outItem.big == datas) {
            this.showList.list = outItem.items
            if (datas == '特码' || datas == '正码') {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(49, listItem1.code.length)
                let title = ''
                if (vi_1 == 0) {
                  title = `${datas}A`
                } else {
                  title = `${datas}B`
                }
                //只分两行
                if (save.length) {
                  this.showList.list.push({
                    small: title,
                    code: save,
                    title: '拆分'
                  })
                }
              })
            } else if (datas == '正码特') {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(49, listItem1.code.length)
                let title = `正${vi_1 + 1}特`
                //只分两行
                if (save.length) {
                  this.showList.list.push({
                    small: title,
                    code: save,
                    title: '拆分'
                  })
                }
              })
            } else if (datas == '尾数') {
              let weiShuArr = []
              weiShuArr = [{
                small: '0尾',
                state: false,
                code: [{
                  code: '10',
                  state: false
                },
                  {
                    code: '20',
                    state: false
                  },
                  {
                    code: '30',
                    state: false
                  },
                  {
                    code: '40',
                    state: false
                  }
                ]
              },
                {
                  small: '1尾',
                  state: false,
                  code: [{
                    code: '01',
                    state: false
                  },
                    {
                      code: '11',
                      state: false
                    },
                    {
                      code: '21',
                      state: false
                    },
                    {
                      code: '31',
                      state: false
                    },
                    {
                      code: '41',
                      state: false
                    }
                  ]
                },
                {
                  small: '2尾',
                  state: false,
                  code: [{
                    code: '02',
                    state: false
                  },
                    {
                      code: '12',
                      state: false
                    },
                    {
                      code: '22',
                      state: false
                    },
                    {
                      code: '32',
                      state: false
                    },
                    {
                      code: '42',
                      state: false
                    }
                  ]
                },
                {
                  small: '3尾',
                  state: false,
                  code: [{
                    code: '03',
                    state: false
                  },
                    {
                      code: '13',
                      state: false
                    },
                    {
                      code: '23',
                      state: false
                    },
                    {
                      code: '33',
                      state: false
                    },
                    {
                      code: '43',
                      state: false
                    }
                  ]
                },
                {
                  small: '4尾',
                  state: false,
                  code: [{
                    code: '04',
                    state: false
                  },
                    {
                      code: '14',
                      state: false
                    },
                    {
                      code: '24',
                      state: false
                    },
                    {
                      code: '34',
                      state: false
                    },
                    {
                      code: '44',
                      state: false
                    }
                  ]
                },
                {
                  small: '5尾',
                  state: false,
                  code: [{
                    code: '05',
                    state: false
                  },
                    {
                      code: '15',
                      state: false
                    },
                    {
                      code: '25',
                      state: false
                    },
                    {
                      code: '35',
                      state: false
                    },
                    {
                      code: '45',
                      state: false
                    }
                  ]
                },
                {
                  small: '6尾',
                  state: false,
                  code: [{
                    code: '06',
                    state: false
                  },
                    {
                      code: '16',
                      state: false
                    },
                    {
                      code: '26',
                      state: false
                    },
                    {
                      code: '30',
                      state: false
                    },
                    {
                      code: '46',
                      state: false
                    }
                  ]
                },
                {
                  small: '7尾',
                  state: false,
                  code: [{
                    code: '07',
                    state: false
                  },
                    {
                      code: '17',
                      state: false
                    },
                    {
                      code: '27',
                      state: false
                    },
                    {
                      code: '37',
                      state: false
                    },
                    {
                      code: '47',
                      state: false
                    }
                  ]
                },
                {
                  small: '8尾',
                  state: false,
                  code: [{
                    code: '08',
                    state: false
                  },
                    {
                      code: '18',
                      state: false
                    },
                    {
                      code: '28',
                      state: false
                    },
                    {
                      code: '38',
                      state: false
                    },
                    {
                      code: '48',
                      state: false
                    }
                  ]
                },
                {
                  small: '9尾',
                  state: false,
                  code: [{
                    code: '09',
                    state: false
                  },
                    {
                      code: '19',
                      state: false
                    },
                    {
                      code: '29',
                      state: false
                    },
                    {
                      code: '39',
                      state: false
                    },
                    {
                      code: '49',
                      state: false
                    }
                  ]
                }
              ]
              this.showList.list[0].code.forEach(thirItem => {
                weiShuArr.forEach(weiItem => {
                  if (thirItem.code == weiItem.small) {
                    weiItem.playway = thirItem.playway
                    weiItem.odds = thirItem.odds
                  }
                })
                //   console.log(thirItem.code)
              })
              this.showList.list = weiShuArr
            } else if (datas == '连尾') {
              let weiShuLianArr = []
              let allCode = {
                '0尾': [{
                  code: '10',
                  state: false
                },
                  {
                    code: '20',
                    state: false
                  },
                  {
                    code: '30',
                    state: false
                  },
                  {
                    code: '40',
                    state: false
                  }
                ],
                '1尾': [{
                  code: '01',
                  state: false
                },
                  {
                    code: '11',
                    state: false
                  },
                  {
                    code: '21',
                    state: false
                  },
                  {
                    code: '31',
                    state: false
                  },
                  {
                    code: '41',
                    state: false
                  }
                ],
                '2尾': [{
                  code: '02',
                  state: false
                },
                  {
                    code: '12',
                    state: false
                  },
                  {
                    code: '22',
                    state: false
                  },
                  {
                    code: '32',
                    state: false
                  },
                  {
                    code: '42',
                    state: false
                  }
                ],
                '3尾': [{
                  code: '03',
                  state: false
                },
                  {
                    code: '13',
                    state: false
                  },
                  {
                    code: '23',
                    state: false
                  },
                  {
                    code: '33',
                    state: false
                  },
                  {
                    code: '43',
                    state: false
                  }
                ],
                '4尾': [{
                  code: '04',
                  state: false
                },
                  {
                    code: '14',
                    state: false
                  },
                  {
                    code: '24',
                    state: false
                  },
                  {
                    code: '34',
                    state: false
                  },
                  {
                    code: '44',
                    state: false
                  }
                ],
                '5尾': [{
                  code: '05',
                  state: false
                },
                  {
                    code: '15',
                    state: false
                  },
                  {
                    code: '25',
                    state: false
                  },
                  {
                    code: '35',
                    state: false
                  },
                  {
                    code: '45',
                    state: false
                  }
                ],
                '6尾': [{
                  code: '06',
                  state: false
                },
                  {
                    code: '16',
                    state: false
                  },
                  {
                    code: '26',
                    state: false
                  },
                  {
                    code: '36',
                    state: false
                  },
                  {
                    code: '46',
                    state: false
                  }
                ],
                '7尾': [{
                  code: '07',
                  state: false
                },
                  {
                    code: '17',
                    state: false
                  },
                  {
                    code: '27',
                    state: false
                  },
                  {
                    code: '37',
                    state: false
                  },
                  {
                    code: '47',
                    state: false
                  }
                ],
                '8尾': [{
                  code: '08',
                  state: false
                },
                  {
                    code: '18',
                    state: false
                  },
                  {
                    code: '28',
                    state: false
                  },
                  {
                    code: '38',
                    state: false
                  },
                  {
                    code: '48',
                    state: false
                  }
                ],
                '9尾': [{
                  code: '09',
                  state: false
                },
                  {
                    code: '19',
                    state: false
                  },
                  {
                    code: '29',
                    state: false
                  },
                  {
                    code: '39',
                    state: false
                  },
                  {
                    code: '49',
                    state: false
                  }
                ]
              }

              this.showList.list.forEach(weiShuOutItem => {
                weiShuOutItem.code.forEach(weiShuIntItem => {
                  let tXSave = []
                  for (let keyInt of Object.keys(allCode)) {
                    if (weiShuIntItem.code == keyInt) {
                      tXSave = allCode[keyInt]
                    }
                  }
                  weiShuLianArr.push({
                    small: weiShuIntItem.code,
                    state: false,
                    playway: weiShuIntItem.playway,
                    odds: weiShuIntItem.odds,
                    code: tXSave,
                    secondTitle: weiShuOutItem.small
                  })
                })
              })
              //   console.log(weiShuLianArr)
              this.showList.list = weiShuLianArr
            } else if (
              datas == '特肖' ||
              datas == '一肖' ||
              datas == '连肖' ||
              datas == '合肖'
            ) {
              let teXiaoArr = []
              outItem.items.forEach(teOutItem => {
                teOutItem.code.forEach(teIntItem => {
                  let tXSave = []
                  teIntItem.zodiac.forEach(zodiacItem => {
                    tXSave.push({
                      code: zodiacItem,
                      state: false
                    })
                  })
                  teXiaoArr.push({
                    small: teIntItem.code,
                    state: false,
                    playway: teIntItem.playway,
                    odds: teIntItem.odds,
                    code: tXSave,
                    secondTitle: teOutItem.small
                  })
                })
              })
              this.showList.list = teXiaoArr
            } else if (datas == '色波') {
              let red = [
                1,
                7,
                13,
                19,
                23,
                29,
                35,
                45,
                2,
                8,
                12,
                18,
                24,
                30,
                34,
                40,
                46
              ]
              let blue = [
                3,
                9,
                15,
                25,
                31,
                37,
                41,
                47,
                4,
                10,
                14,
                20,
                26,
                36,
                42,
                48
              ]
              let green = [
                5,
                11,
                17,
                21,
                27,
                33,
                39,
                43,
                6,
                16,
                22,
                28,
                32,
                38,
                44,
                49
              ]
              let redSingle = [1, 7, 13, 19, 23, 29, 35, 45]
              let redDouble = [2, 8, 12, 18, 24, 30, 34, 40, 46]
              let redBig = [29, 30, 34, 35, 40, 45, 46]
              let redSmall = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24]
              let redHSingle = [1, 7, 12, 18, 23, 29, 30, 34, 45]
              let redHDouble = [2, 8, 13, 19, 24, 35, 40, 46]

              let greenSingle = [5, 11, 17, 21, 27, 33, 39, 43, 49]
              let greenDouble = [6, 16, 22, 28, 32, 38, 44]
              let greenBig = [32, 33, 38, 39, 43, 44, 49]
              let greenSmall = [5, 6, 11, 16, 17, 21, 22, 27, 28]
              let greenHSingle = [5, 16, 21, 27, 32, 38, 43, 49]
              let greenHDouble = [6, 11, 17, 22, 28, 33, 39, 44]

              let blueSingle = [3, 9, 15, 25, 31, 37, 41, 47]
              let blueDouble = [4, 10, 14, 20, 26, 36, 42, 48]
              let blueBig = [31, 36, 37, 41, 42, 47, 48]
              let blueSmall = [3, 4, 9, 10, 14, 15, 20, 25, 26]
              let blueHSingle = [3, 9, 10, 14, 25, 36, 41, 47]
              let blueHDouble = [4, 15, 20, 26, 31, 37, 42, 48]

              // console.log(outItem.items);
              outItem.items.forEach(boseOutItem => {
                boseOutItem.code.forEach(boseIntItem => {
                  if (boseIntItem.code == '红波') {
                    boseIntItem.list = red
                  } else if (boseIntItem.code == '蓝波') {
                    boseIntItem.list = blue
                  } else if (boseIntItem.code == '绿波') {
                    boseIntItem.list = green
                  } else if (boseIntItem.code == '红单') {
                    boseIntItem.list = redSingle
                  } else if (boseIntItem.code == '红双') {
                    boseIntItem.list = redDouble
                  } else if (boseIntItem.code == '红大') {
                    boseIntItem.list = redBig
                  } else if (boseIntItem.code == '红小') {
                    boseIntItem.list = redSmall
                  } else if (boseIntItem.code == '红合单') {
                    boseIntItem.list = redHSingle
                  } else if (boseIntItem.code == '红合双') {
                    boseIntItem.list = redHDouble
                  } else if (boseIntItem.code == '绿单') {
                    boseIntItem.list = greenSingle
                  } else if (boseIntItem.code == '绿双') {
                    boseIntItem.list = greenDouble
                  } else if (boseIntItem.code == '绿大') {
                    boseIntItem.list = greenBig
                  } else if (boseIntItem.code == '绿小') {
                    boseIntItem.list = greenSmall
                  } else if (boseIntItem.code == '绿合单') {
                    boseIntItem.list = greenHSingle
                  } else if (boseIntItem.code == '绿合双') {
                    boseIntItem.list = greenHDouble
                  } else if (boseIntItem.code == '蓝单') {
                    boseIntItem.list = blueSingle
                  } else if (boseIntItem.code == '蓝双') {
                    boseIntItem.list = blueDouble
                  } else if (boseIntItem.code == '蓝大') {
                    boseIntItem.list = blueBig
                  } else if (boseIntItem.code == '蓝小') {
                    boseIntItem.list = blueSmall
                  } else if (boseIntItem.code == '蓝合单') {
                    boseIntItem.list = blueHSingle
                  } else if (boseIntItem.code == '蓝合双') {
                    boseIntItem.list = blueHDouble
                  }
                })
              })
              console.log(outItem.items)
            }
          }
        })
      },
      //尾数选中
      weiShuActiveFc (outItem) {
        if (!localStorage.token) {
          this.$router.push({
            path: '/admin/login'
          })
          return false
        }
        outItem.state = !outItem.state
        outItem.code.forEach(intItem => {
          intItem.state = !intItem.state
        })

        // let xuanzhong = 0;
        // if (this.sideSelect == "连码" || this.sideSelect == "连肖" || this.sideSelect == "连尾" || this.sideSelect == "合肖" || this.sideSelect == "全不中") {
        //   if (this.active.shengXiaoLianMol == "二肖连中" || this.active.weiShuLianMol == "二尾连中" || this.active.weiShuLianMol == "二尾连不中") {
        //      xuanzhong =xuanzhong +1 ;
        //      console.log(xuanzhong)
        //     if (xuanzhong > 2) {
        //       erquanzhong--;
        //       this.$newToast("不允许超过2个号码");
        //       intItem.state = false;
        //     }
        //   }
        // } else {
        this.calculate()
        // }

      },
      //计算总数
      calculate () {
        let num = 0
        let erquanzhong = 0
        let hexiaoLength = 0
        //计算常用num,一种外层计算总数，一种里层计算总数
        if (
          this.sideSelect == '尾数' ||
          this.sideSelect == '特肖' ||
          this.sideSelect == '一肖' ||
          this.sideSelect == '连肖' ||
          this.sideSelect == '连尾'
        ) {
          this.showList.list.forEach(outItem => {
            if (outItem.state) {
              if (this.sideSelect == '连肖' || this.sideSelect == '连尾') {
                erquanzhong = erquanzhong + 1
                if (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连中' || this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连不中' ||
                  this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连中' || this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连不中') {
                  if (erquanzhong > 2) {
                    erquanzhong--
                    this.noChange(outItem, 2)
                    return false
                  }
                }
                if (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连中' || this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连不中' ||
                  this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连中' || this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连不中') {
                  if (erquanzhong > 3) {
                    erquanzhong--
                    this.noChange(outItem, 3)
                    return false
                  }
                }
                if (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连中' || this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连不中' ||
                  this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连中' || this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连不中') {
                  if (erquanzhong > 4) {
                    erquanzhong--
                    this.noChange(outItem, 4)
                    return false
                  }
                }
                if (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '五肖连中') {
                  if (erquanzhong > 5) {
                    erquanzhong--
                    this.noChange(outItem, 5)
                    return false
                  }
                }
              } else {
                num = num + 1
              }
            }
          })
        } else if (this.sideSelect == '合肖') {
          this.showList.list.forEach(outItem => {
            if (outItem.state) {
              hexiaoLength = hexiaoLength + 1
              if (this.active.heXiaoMol == '二肖') {

                if (hexiaoLength > 2) {
                  this.noChange(outItem, 2)
                  return false
                }

                if (hexiaoLength >= 2) {
                  num = hexiaoLength * (hexiaoLength - 1) / (2 * 1)
                }
                // if (hexiaoLength == 2) {
                //   num = 1;
                // } else if (hexiaoLength > 2) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //   this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '三肖') {
                if (hexiaoLength > 3) {
                  this.noChange(outItem, 3)
                  return false
                }
                if (hexiaoLength >= 3) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) / (3 * 2 * 1)
                }
                // if (hexiaoLength == 3) {
                //   num = 1;
                // } else if (hexiaoLength > 3) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //   this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '四肖') {
                if (hexiaoLength > 4) {
                  this.noChange(outItem, 4)
                  return false
                }
                if (hexiaoLength >= 4) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) / (4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 4) {
                //   num = 1;
                // } else if (hexiaoLength > 4) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //   this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '五肖') {
                if (hexiaoLength > 5) {
                  this.noChange(outItem, 5)
                  return false
                }
                if (hexiaoLength >= 5) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) / (5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 5) {
                //   num = 1;
                // } else if (hexiaoLength > 5) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //   this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '六肖') {
                if (hexiaoLength > 6) {
                  this.noChange(outItem, 6)
                  return false
                }
                if (hexiaoLength >= 6) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) / (6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 6) {
                //   num = 1;
                // } else if (hexiaoLength > 6) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //   this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '七肖') {
                if (hexiaoLength > 7) {
                  this.noChange(outItem, 7)
                  return false
                }
                if (hexiaoLength >= 7) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) / (7 * 6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 7) {
                //   num = 1;
                // } else if (hexiaoLength > 7) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //    this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '八肖') {
                if (hexiaoLength > 8) {
                  this.noChange(outItem, 8)
                  return false
                }
                if (hexiaoLength >= 8) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) / (8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 8) {
                //   num = 1;
                // } else if (hexiaoLength > 8) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //    this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '九肖') {
                if (hexiaoLength > 9) {
                  this.noChange(outItem, 9)
                  return false
                }
                if (hexiaoLength >= 9) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) / (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 9) {
                //   num = 1;
                // } else if (hexiaoLength > 9) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //    this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '十肖') {
                if (hexiaoLength > 10) {
                  this.noChange(outItem, 10)
                  return false
                }
                if (hexiaoLength >= 10) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) * (hexiaoLength - 9) / (10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 10) {
                //   num = 1;
                // } else if (hexiaoLength > 10) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //    this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              } else if (this.active.heXiaoMol == '十一肖') {
                if (hexiaoLength > 11) {
                  this.noChange(outItem, 11)
                  return false
                }
                if (hexiaoLength >= 11) {
                  num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) * (hexiaoLength - 9) * (hexiaoLength - 10) / (11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                }
                // if (hexiaoLength == 11) {
                //   num = 1;
                // } else if (hexiaoLength > 11) {
                //   // this.$errToast(`不能超过${this.active.heXiaoMol}数目`);
                //    this.$newToast(`不能超过${this.active.heXiaoMol}数目`);
                //   outItem.state = false;
                //   outItem.code.forEach(item => {
                //     item.state = false;
                //   });
                // }
              }
            }
          })
          // console.log(this.showList.list)
        } else {
          this.showList.list.forEach(outItem => {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                if (
                  (this.sideSelect == '连码' && this.active.lianmaMol == '二全中') ||
                  (this.sideSelect == '连码' && this.active.lianmaMol == '二中特') ||
                  (this.sideSelect == '连码' && this.active.lianmaMol == '特串') ||
                  (this.sideSelect == '连码' && this.active.lianmaMol == '三全中') ||
                  (this.sideSelect == '连码' && this.active.lianmaMol == '三中二') ||
                  (this.sideSelect == '连码' && this.active.lianmaMol == '四中一')
                ) {
                  erquanzhong++
                  if (erquanzhong > 10) {
                    erquanzhong--
                    // this.$errToast("不允许超过10个号码");
                    this.$newToast('不允许超过10个号码')
                    intItem.state = false
                  }
                  //  二全中，二中特,特串  不能超过两个号码
                  if (this.sideSelect == '连码' && this.active.lianmaMol == '二全中' || this.sideSelect == '连码' && this.active.lianmaMol == '二中特' ||
                    this.sideSelect == '连码' && this.active.lianmaMol == '特串') {
                    if (erquanzhong > 2) {
                      erquanzhong--
                      // this.$errToast("不允许超过10个号码");
                      this.$newToast('不允许超过2个号码')
                      intItem.state = false
                    }
                  }

                  if (this.sideSelect == '连码' && this.active.lianmaMol == '三全中' || this.sideSelect == '连码' && this.active.lianmaMol == '三中二') {
                    if (erquanzhong > 3) {
                      erquanzhong--
                      // this.$errToast("不允许超过10个号码");
                      this.$newToast('不允许超过3个号码')
                      intItem.state = false
                    }
                  }

                  if (this.sideSelect == '连码' && this.active.lianmaMol == '四中一') {
                    if (erquanzhong > 4) {
                      erquanzhong--
                      // this.$errToast("不允许超过10个号码");
                      this.$newToast('不允许超过4个号码')
                      intItem.state = false
                    }
                  }

                } else if (this.sideSelect == '全不中') {
                  hexiaoLength++
                  if (hexiaoLength > 15) {
                    // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    this.$newToast(`不允许超过15个号码`)
                    intItem.state = false
                    return false
                  }

                  if (this.active.quanBuZhongMol == '五不中') {
                    if (hexiaoLength > 5) {
                      this.$newToast(`不允许超过5个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 5) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) / (5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 5) {
                    //   num = 1;
                    // } else if (hexiaoLength > 5) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '六不中') {
                    if (hexiaoLength > 6) {
                      this.$newToast(`不允许超过6个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 6) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) / (6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 6) {
                    //   num = 1;
                    // } else if (hexiaoLength > 6) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '七不中') {
                    if (hexiaoLength > 7) {
                      this.$newToast(`不允许超过7个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 7) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) / (7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 7) {
                    //   num = 1;
                    // } else if (hexiaoLength > 7) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '八不中') {
                    if (hexiaoLength > 8) {
                      this.$newToast(`不允许超过8个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 8) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) / (8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 8) {
                    //   num = 1;
                    // } else if (hexiaoLength > 8) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '九不中') {
                    if (hexiaoLength > 9) {
                      this.$newToast(`不允许超过9个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 9) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) / (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 9) {
                    //   num = 1;
                    // } else if (hexiaoLength > 9) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '十不中') {
                    if (hexiaoLength > 10) {
                      this.$newToast(`不允许超过10个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 10) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) * (hexiaoLength - 9) / (10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 10) {
                    //   num = 1;
                    // } else if (hexiaoLength > 10) {
                    //   this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '十一不中') {
                    if (hexiaoLength > 11) {
                      this.$newToast(`不允许超过11个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 11) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) * (hexiaoLength - 9) * (hexiaoLength - 10) / (11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 11) {
                    //   num = 1;
                    // } else if (hexiaoLength > 11) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  } else if (this.active.quanBuZhongMol == '十二不中') {
                    if (hexiaoLength > 12) {
                      this.$newToast(`不允许超过12个号码`)
                      intItem.state = false
                      return false
                    }
                    if (hexiaoLength >= 12) {
                      num = hexiaoLength * (hexiaoLength - 1) * (hexiaoLength - 2) * (hexiaoLength - 3) * (hexiaoLength - 4) * (hexiaoLength - 5) * (hexiaoLength - 6) * (hexiaoLength - 7) * (hexiaoLength - 8) * (hexiaoLength - 9) * (hexiaoLength - 10) * (hexiaoLength - 11) / (12 * 11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
                    }

                    // if (hexiaoLength == 12) {
                    //   num = 1;
                    // } else if (hexiaoLength > 12) {
                    //   // this.$errToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   this.$newToast(`不能超过${this.active.quanBuZhongMol}数目`);
                    //   intItem.state = false;
                    // }
                  }
                } else {
                  num = num + 1
                }
              }
            })
          })
        }

        //对上面特殊连码，进行拆分计算，赋给num,上面已对一部分num进行计算
        if (
          (this.sideSelect == '连码' && this.active.lianmaMol == '二全中') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '二中特') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '特串') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连不中')
        ) {
          num = erquanzhong * (erquanzhong - 1) / 2
        } else if (
          (this.sideSelect == '连码' && this.active.lianmaMol == '三全中') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '三中二') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连不中')
        ) {
          num = erquanzhong * (erquanzhong - 1) * (erquanzhong - 2) / 6
        } else if (this.sideSelect == '连码' && this.active.lianmaMol == '四中一') {
          if (erquanzhong == 4) num = 1
          if (erquanzhong == 5) num = 5
          if (erquanzhong == 6) num = 15
          if (erquanzhong == 7) num = 35
          if (erquanzhong == 8) num = 70
          if (erquanzhong == 9) num = 126
          if (erquanzhong == 10) num = 210
        } else if (
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连不中')
        ) {
          num =
            erquanzhong *
            (erquanzhong - 1) *
            (erquanzhong - 2) *
            (erquanzhong - 3) /
            24
        } else if (
          this.sideSelect == '连肖' &&
          this.active.shengXiaoLianMol == '五肖连中'
        ) {
          num =
            erquanzhong *
            (erquanzhong - 1) *
            (erquanzhong - 2) *
            (erquanzhong - 3) *
            (erquanzhong - 4) /
            120
        }
        //总数
        this.total.num = num
        this.total.momey = +this.total.inputVal * num
        // if (this.total.model.name == "元") {
        //   this.total.momey =
        //     +this.total.inputVal * num * this.total.double * this.total.model.db;
        // } else if (this.total.model.name == "角") {
        //   this.total.momey = (+this.total.inputVal *
        //     num *
        //     this.total.double *
        //     this.total.model.db
        //   ).toFixed(1);
        // } else if (this.total.model.name == "分") {
        //   this.total.momey = (+this.total.inputVal *
        //     num *
        //     this.total.double *
        //     this.total.model.db
        //   ).toFixed(2);
        // }
      },
      // 显示投注框投注逻辑(先计算一遍)
      showPopup () {
        if (!this.isopen) {
          this.$newToast('已封盘')
          return false
        }
        this.calculate()
        //整理数据
        let submitListShow = []
        this.submitList = []
        this.submitListShow = []
        //进行this.submitList push 组装，提交用
        if (
          this.sideSelect == '尾数' ||
          this.sideSelect == '特肖' ||
          this.sideSelect == '一肖' ||
          this.sideSelect == '连肖' ||
          this.sideSelect == '连尾' ||
          this.sideSelect == '合肖'
        ) {

          this.showList.list.forEach(outItem => {
            if (outItem.state) {
              this.submitList.push({
                code: outItem.small,
                odds: outItem.odds,
                playway: outItem.playway,
                intTitle: this.sideSelect
              })
            }
          })
        } else if (this.sideSelect == '过关') {
          this.showList.list.forEach(outItem => {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                this.submitList.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle: this.active.guoGuanMol
                })
              }
            })
          })
        } else {
          this.showList.list.forEach(outItem => {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                this.submitList.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle: outItem.small && outItem.small != '拆分' ?
                    outItem.small : this.sideSelect
                })
              }
            })
          })
        }

        //组装另外一种显示用，上面不冲突
        if (
          (this.sideSelect == '连码' && this.active.lianmaMol == '二全中') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '二中特') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '特串') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '二肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '二尾连不中')
        ) {
          let saveStringArr = []
          if (this.sideSelect == '连码') {
            this.showList.list.forEach(outItem => {
              outItem.code.forEach(intItem => {
                if (intItem.state) {
                  saveStringArr.push(intItem.code)
                }
              })
            })
          } else if (this.sideSelect == '连肖' || this.sideSelect == '连尾') {
            this.showList.list.forEach(outItem => {
              if (outItem.state) {
                saveStringArr.push(outItem.small)
              }
            })
          }

          if (saveStringArr.length < 2) {
            // this.$errToast(`请选择2-10个号码`);
            this.$newToast('请选择2-10个号码')
            return false
          }
          let resultArr = this.requireArr(saveStringArr, 2)
          // console.log(resultArr)
          resultArr.forEach(item => {
            let intTitle = ''
            if (this.sideSelect == '连码') {
              intTitle = this.active.lianmaMol
            } else if (this.sideSelect == '连尾') {
              intTitle = this.active.weiShuLianMol
            } else if (this.sideSelect == '连肖') {
              intTitle = this.active.shengXiaoLianMol
            }

            //  console.log(this.submitList)
            let minArr = []
            this.submitList.forEach(v => {
              minArr.push(v.odds - 0)
            })

            // console.log(this.submitList);
            submitListShow.push({
              code: '[' + item + ']',
              odds: this.active.lianmaMol == '二中特' ? this.submitList[0].odds : Math.min.apply(Math, minArr),
              playway: this.submitList[0].playway,
              intTitle: intTitle
            })
          })

          this.submitListShow = submitListShow
        } else if (
          (this.sideSelect == '连码' && this.active.lianmaMol == '三全中') ||
          (this.sideSelect == '连码' && this.active.lianmaMol == '三中二') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '三肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '三尾连不中')
        ) {
          let saveStringArr = []
          if (this.sideSelect == '连码') {
            this.showList.list.forEach(outItem => {
              outItem.code.forEach(intItem => {
                if (intItem.state) {
                  saveStringArr.push(intItem.code)
                }
              })
            })
          } else if (this.sideSelect == '连肖' || this.sideSelect == '连尾') {
            this.showList.list.forEach(outItem => {
              if (outItem.state) {
                saveStringArr.push(outItem.small)
              }
            })
          }
          if (saveStringArr.length < 3) {
            // this.$errToast(`${this.active.lianmaMol}请选择3-10个号码`);
            this.$newToast(`${this.active.lianmaMol}请选择3-10个号码`)
            return false
          }
          let resultArr = this.requireArr(saveStringArr, 3)
          resultArr.forEach(item => {
            let intTitle = ''
            if (this.sideSelect == '连码') {
              intTitle = this.active.lianmaMol
            } else if (this.sideSelect == '连尾') {
              intTitle = this.active.weiShuLianMol
            } else if (this.sideSelect == '连肖') {
              intTitle = this.active.shengXiaoLianMol
            }

            let minArr = []
            this.submitList.forEach(v => {
              minArr.push(v.odds - 0)
            })
            submitListShow.push({
              code: '[' + item + ']',
              odds: this.active.lianmaMol == '三中二' ? this.submitList[0].odds : Math.min.apply(Math, minArr),
              playway: this.submitList[0].playway,
              intTitle: intTitle
            })
          })
          this.submitListShow = submitListShow
        } else if (
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连中') ||
          (this.sideSelect == '连肖' && this.active.shengXiaoLianMol == '四肖连不中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连中') ||
          (this.sideSelect == '连尾' && this.active.weiShuLianMol == '四尾连不中')
        ) {
          let saveStringArr = []
          if (this.sideSelect == '连码') {
            this.showList.list.forEach(outItem => {
              outItem.code.forEach(intItem => {
                if (intItem.state) {
                  saveStringArr.push(intItem.code)
                }
              })
            })
          } else if (this.sideSelect == '连肖' || this.sideSelect == '连尾') {
            this.showList.list.forEach(outItem => {
              if (outItem.state) {
                saveStringArr.push(outItem.small)
              }
            })
          }
          if (saveStringArr.length < 4) {
            // this.$errToast(`${this.active.shengXiaoLianMol}请选择4-10个号码`);
            this.$newToast(`${this.active.shengXiaoLianMol}请选择4-10个号码`)
            return false
          }
          // console.log(saveStringArr)
          let resultArr = this.requireArr(saveStringArr, 4)
          resultArr.forEach(item => {
            let intTitle = ''
            if (this.sideSelect == '连尾') {
              intTitle = this.active.weiShuLianMol
            } else if (this.sideSelect == '连肖') {
              intTitle = this.active.shengXiaoLianMol
            }

            let minArr = []
            this.submitList.forEach(v => {
              minArr.push(v.odds - 0)
            })

            submitListShow.push({
              code: '[' + item + ']',
              odds: Math.min.apply(Math, minArr),
              playway: this.submitList[0].playway,
              intTitle: intTitle
            })
          })
          this.submitListShow = submitListShow
        } else if (
          this.sideSelect == '连肖' &&
          this.active.shengXiaoLianMol == '五肖连中'
        ) {
          let saveStringArr = []
          if (this.sideSelect == '连码') {
            this.showList.list.forEach(outItem => {
              outItem.code.forEach(intItem => {
                if (intItem.state) {
                  saveStringArr.push(intItem.code)
                }
              })
            })
          } else if (this.sideSelect == '连肖' || this.sideSelect == '连尾') {
            this.showList.list.forEach(outItem => {
              if (outItem.state) {
                saveStringArr.push(outItem.small)
              }
            })
          }
          if (saveStringArr.length < 5) {
            // this.$errToast(`${this.active.shengXiaoLianMol}请选择5-10个号码`);
            this.$newToast(`${this.active.shengXiaoLianMol}请选择5-10个号码`)
            return false
          }
          let resultArr = this.requireArr(saveStringArr, 5)
          resultArr.forEach(item => {
            let intTitle = ''
            if (this.sideSelect == '连尾') {
              intTitle = this.active.weiShuLianMol
            } else if (this.sideSelect == '连肖') {
              intTitle = this.active.shengXiaoLianMol
            }

            let minArr = []
            this.submitList.forEach(v => {
              minArr.push(v.odds - 0)
            })

            submitListShow.push({
              code: '[' + item + ']',
              odds: Math.min.apply(Math, minArr),
              playway: this.submitList[0].playway,
              intTitle: intTitle
            })
          })
          this.submitListShow = submitListShow
        } else if (this.sideSelect == '合肖') {
          let saveStringArr = []
          this.showList.list.forEach(outItem => {
            if (outItem.state) {
              saveStringArr.push(outItem.small)
            }
          })
          if (this.active.heXiaoMol == '二肖') {
            if (saveStringArr.length < 2) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '三肖') {
            if (saveStringArr.length < 3) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '四肖') {
            if (saveStringArr.length < 4) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '五肖') {
            if (saveStringArr.length < 5) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '六肖') {
            if (saveStringArr.length < 6) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '七肖') {
            if (saveStringArr.length < 7) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '八肖') {
            if (saveStringArr.length < 8) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '九肖') {
            if (saveStringArr.length < 9) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '十肖') {
            if (saveStringArr.length < 10) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          } else if (this.active.heXiaoMol == '十一肖') {
            if (saveStringArr.length < 11) {
              // this.$errToast(`不能小于${this.active.heXiaoMol}数目`);
              this.$newToast(`不能小于${this.active.heXiaoMol}数目`)
              return false
            }
          }

          submitListShow.push({
            code: '[' + saveStringArr + ']',
            odds: this.submitList[0].odds,
            playway: this.submitList[0].playway,
            intTitle: this.submitList[0].intTitle
          })
          // console.log(saveStringArr)
          // saveStringArr.forEach(outItem => {
          //   submitListShow.push({
          //     code: outItem,
          //     odds: this.submitList[0].odds,
          //     playway: this.submitList[0].playway,
          //     intTitle: this.active.heXiaoMol
          //   });
          // });
          this.submitListShow = submitListShow
        } else if (this.sideSelect == '全不中') {
          let saveStringArr = []
          this.showList.list.forEach(outItem => {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                saveStringArr.push(intItem.code)
              }
            })
          })
          if (this.active.quanBuZhongMol == '五不中') {
            if (saveStringArr.length < 5) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '六不中') {
            if (saveStringArr.length < 6) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '七不中') {
            if (saveStringArr.length < 7) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '八不中') {
            if (saveStringArr.length < 8) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '九不中') {
            if (saveStringArr.length < 9) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '十不中') {
            if (saveStringArr.length < 10) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '十一不中') {
            if (saveStringArr.length < 11) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          } else if (this.active.quanBuZhongMol == '十二不中') {
            if (saveStringArr.length < 12) {
              this.$newToast(`不能小于${this.active.quanBuZhongMol}数目`)
              return false
            }
          }

          submitListShow.push({
            code: '[' + saveStringArr + ']',
            odds: this.submitList[0].odds,
            playway: this.submitList[0].playway,
            intTitle: this.active.quanBuZhongMol
          })
          // this.showList.list.forEach(outItem => {
          //   outItem.code.forEach(intItem => {
          //     if (intItem.state) {
          //       submitListShow.push({
          //         code: intItem.code,
          //         odds: this.submitList[0].odds,
          //         playway: this.submitList[0].playway,
          //         intTitle: this.active.quanBuZhongMol
          //       });
          //     }
          //   });
          // });
          this.submitListShow = submitListShow
        }
        // console.log(this.submitList)
        if (!this.submitList.length) {
          this.$newToast('请选择投注类型')
          return false
        }

        //显示
        const component = this.$refs['mySumit']
        component.show()
        //滚动bug
        this.showSubmit = true
      },
      //获取组合数组值
      requireArr (arr, size) {
        let allResult = []
        let newReturn = function (arr, size, result) {
          let arrLen = arr.length
          if (size > arrLen) {
            return
          }
          if (size == arrLen) {
            allResult.push([].concat(result, arr))
          } else {
            for (let i = 0; i < arrLen; i++) {
              let newResult = [].concat(result)
              newResult.push(arr[i])
              if (size == 1) {
                allResult.push(newResult)
              } else {
                let newArr = [].concat(arr)
                newArr.splice(0, i + 1)
                newReturn(newArr, size - 1, newResult)
              }
            }
          }
        }
        newReturn(arr, size, [])
        return allResult
      },
      //重置所有信息
      reset (param) {
        this.showList.list.forEach((outItem, _v1) => {
          outItem.state ? (outItem.state = false) : ''
          outItem.code.forEach((intItem, _v2) => {
            intItem.state = false
          })
        })
        this.total.num = 0
        this.total.momey = 0
        this.total.inputVal = ''
        this.kuaiJie = {}
        if (!param) {
          // this.active={
          //   teMol: "特码A",
          //   zhengMol: "正码A",
          //   zhengTMol: "正1特",
          //   lianmaMol: "二全中",
          //   guoGuanMol: "正码一",
          //   shengXiaoLianMol: "二肖连中",
          //   weiShuLianMol: "二尾连中",
          //   heXiaoMol: "二肖",
          //   quanBuZhongMol: "五不中",
          //   seBoMol: "色波"
          // };
          // this.shengXiaoLianActive='二肖连中';
          // this.weiShuLianActive='二尾连中';
        }

      },

      noChange (outItem, num) {
        outItem.state = false
        this.$newToast(`不允许超过${num}个号码`)
        outItem.code.forEach(inItem => {
          inItem.state = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../assets/less/public/var.less";

  .container {
    height: 100%;
    .betArea-decial-box {
      position: relative;
      min-width: 100%;
      .lottery-cont {
        // position: fixed;
        // width: 100%;
        // height: 100%;
        // top: 3.95rem;
        // position: absolute;
        width: 100%;
        height: 100%;
        // top: 0;
        .wrap {
          width: 100%;
          .list {
            .lottery-ul {
              &.one-to-six {
                border-bottom: 0;
                .ball {
                  font-weight: 600;
                  font-size: .34rem;
                  color: rgba(0, 0, 0, .7);
                  font-family: Helvetica, STXihei, SimHei, serif;
                  &.active {
                    color: #fff;
                  }
                }
                .one-to-six-child {
                  &:nth-child(7) {
                    margin-right: 1rem;
                  }
                  &:nth-child(10) {
                    margin-right: 1rem;
                  }
                  // &:nth-child(n+8){
                  //     background: red;
                  // }
                }
              }
              &.ballPadding {
                padding-left: 0.2rem;
                padding-right: 0.2rem;
                border-bottom: 0;
              }
              .lottery-item {
                text-align: center;
                flex: 1;
                &.te {
                  .ball {
                    font-weight: 600;
                    font-size: .38rem;
                    &.nblue {
                      color: #20a2d8;
                      border: 1px solid #20a2d8;
                    }
                    &.nred {
                      color: #f36055;
                      border: 1px solid #f36055;
                    }
                    &.ngreen {
                      color: #54bf37;
                      border: 1px solid #54bf37;
                    }
                    &.blue {
                      background: #20a2d8;
                      color: #fff;
                    }
                    &.red {
                      background: #f36055;
                      color: #fff;
                    }
                    &.green {
                      background: #54bf37;
                      color: #fff;
                    }
                  }
                  .fontSebo {
                    font-size: .34rem;
                  }
                }
                &.style-seBo {
                  width: 0.7rem;
                  min-width: 0.7rem;
                  max-width: 0.7rem;
                  div.ball {
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 0.6rem;
                    margin: 0 0;
                  }
                  &:first-child {
                    margin-left: 0.18rem;
                  }
                  &:nth-child(11) {
                    margin-left: 0.18rem;
                  }
                }
              }
              &.trail {
                padding-top: 0.2rem;
                padding-left: 0.12rem;
                border-bottom: 0;
                .lottery-item {
                  margin-bottom: 0;
                  width: 12%;
                  min-width: 12%;
                  max-width: 12%;
                  margin-right: 0.18rem;
                }
              }
            }
            &.style-seBo-box {
              border-bottom: 0;
              div {
                &:last-child {
                  .lottery-ul {
                    border-bottom: 0;
                  }
                }
              }
            }
            &:nth-child(2) {
              // background: red;
              .lottery-ul {
                border-bottom: 0;
                .lottery-item {
                  .ballTe {
                    font-weight: 600;
                    font-size: .34rem;
                    color: rgba(0, 0, 0, .7);
                    font-family: Helvetica, STXihei, SimHei, serif;
                    &.active {
                      color: #fff;
                    }
                    //  #555;
                    // color:#666;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
