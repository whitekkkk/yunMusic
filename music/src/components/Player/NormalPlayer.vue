<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <!-- <div class="normal-player" v-show="this.$store.getters.isFullScreen"> -->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="palyer-bg">
        <img :src="currentSong.picUrl">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader.vue";
import PlayerMiddle from "./PlayerMiddle.vue";
import PlayerBottom from "./PlayerBottom.vue";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  computed: {
    //通过mapGetters将getters里的数据映射为局部数据
    ...mapGetters([
      'isFullScreen', 
      'currentSong'
      ]),
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter(el, done) {
      Velocity(el, "transition.shrinkIn", { duration: 500 }, function () {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, "transition.shrinkOut", { duration: 500 }, function () {
        done();
      });
    },
  },
  watch:{
    currentSong(newValue, oldValue){
      if(newValue.id === undefined){
        return
      }
      this.getSongLyric(newValue.id)
    }
  },
  props:{
    totalTime:{
      type: Number,
      default: 0,
      required: true
    },
    currentTime:{
      type: Number,
      default: 0,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .palyer-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>