<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/Player/NormalPlayer.vue";
import MiniPlayer from "../components/Player/MiniPlayer.vue";
import ListPlayer from "../components/Player/ListPlayer.vue";
import { mapGetters, mapActions } from "vuex";
import mode from "../store/modeType";
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from "../tools/tools";
export default {
  name:'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList",
    ]),
  },
  methods: {
    ...mapActions(["setCurrentIndex", "setFavoriteList", "setHistorySong", "setHistoryList"]),
    timeupdate(e) {
      // console.log(e.target.currentTime);
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    },


  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex() {
      /*
      注意点：在ios中系统不会自动加载歌曲，所以oncanplay不会自动执行
              在PC端和Android端，系统会自动加载歌曲，所以oncanplay会自动执行
      解决方案：如何监听ios中audio的歌曲是否已经准备好了，通过ondurationchange事件来监听
              ondurationchange事件什么时候执行：当歌曲加载完成之后执行，因为只有歌曲加载完成之后才能获取到歌曲的总时长
      */
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration;
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong);
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    curTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue;
    },
    favoriteList(newValue, oldValue) {
      // window.localStorage.setItem("favoriteList", JSON.stringify(newValue));
      setLocalStorage("favoriteList", newValue)
    },
    historyList(newValue, oldValue) {
      // window.localStorage.setItem("historyList", JSON.stringify(newValue));
      setLocalStorage("historyList", newValue)
    },
  },
  created() {
    // let favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    let favoriteList = getLocalStorage("favoriteList");
    if (favoriteList === null) {
      return;
    }
    this.setFavoriteList(favoriteList);

    // let historyList = JSON.parse(window.localStorage.getItem("historyList"));
    let historyList = getLocalStorage("historyList");
    if (historyList === null) {
      return;
    }
    this.setHistoryList(historyList);
  },
  mounted() {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration;
    };
  },
  data() {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
};
</script>

<style scoped lang="scss">
</style>