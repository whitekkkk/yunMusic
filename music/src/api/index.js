//管理请求各种接口地址的

import Network from "./network"

export const getBanner = () => Network.get('banner?type=2') //顶部轮播图图片
export const getPersonalized = () => Network.get('personalized?limit=6') //推荐歌单
export const getNewAlbum = () => Network.get('album/newest') //最新专辑
export const getNewSong = () => Network.get('personalized/newsong') //最新音乐
export const getPlayList = (data) => Network.get('playlist/detail', data) //详情页
export const getAlbum = (data) => Network.get('album', data) //
export const getSongDetail = (data) => Network.get('song/detail', data) //歌曲详情页
export const getSongLyric = (data) => Network.get('lyric', data)//歌词页
export const getSongURL = (data) => Network.get('song/url', data)//歌曲播放地址
export const getArtistsSongs = (data) => Network.get('artists', data)//歌手详情地址
// export const getHotArtists = () => Network.get('top/artists?offset=0&limit=5')//歌手
export const getHotArtists = () => { //歌手
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=16&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=0&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let keys = ['热']
    let list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })

}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '飙升榜', id: 3 },
        { name: '新歌榜', id: 0 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 1 }
      ],
      recList: [
        { name: '黑胶VIP爱听榜', id: 23 },
        { name: '云音乐说唱榜', id: 25 },
        { name: '云音乐古典榜', id: 32 },
        { name: '云音乐电音榜', id: 26 },
        { name: '云音乐ACG榜', id: 22 },
        { name: '云音乐韩语榜', id: 24 }
      ],
      globalList: [
        { name: '云音乐国电榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: '美国Billboard榜', id: 21 },
        { name: 'Beatport全球电子舞曲榜', id: 10 },
        { name: 'KTV唛榜', id: 8 },
        { name: '日本Oricon榜', id: 29 }
      ],
      otherList: [
        { name: '云音乐欧美热歌榜', id: 7 },
        { name: '云音乐欧美新歌榜', id: 19 },
        { name: '法国 NRJ Vos Hits 周榜', id: 27 },
        { name: '云音乐ACG动画榜', id: 28 },
        { name: '云音乐ACG游戏榜', id: 30 },
        { name: '云音乐ACG VOCALOID榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}//获取分类

// export const getTopList = (data) => Network.get('top/list', data)//点击分类后详情 注意点：已失效，采用getPlayList获取排行榜歌单详情内容

export const getSearchList = (data) => Network.get('search?type=1', data)
export const getSearchHot = () => Network.get('search/hot')