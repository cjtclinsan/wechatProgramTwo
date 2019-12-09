import {
  getBannerData,
  getHotData,
  getCourseData
} from '../../service/home.js'

import {
  ONLINE,
  RECORD,
  BOTH,
  BACK_TOP_POSITION
} from '../../common/const.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    hotCourse: [],
    titles: ["线上", "录播", "双师"],
    course: {
      [ONLINE]: {pageNum: 1, list: []},
      [RECORD]: { pageNum: 1, list: []},
      [BOTH]: { pageNum: 1, list: []}
    },
    currentType: ONLINE,
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  onBackTop() {
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 0
    // })
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },
  scrollPosition(e) {
    const position = e.scrollTop;

    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })

    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
      console.log(show);
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
    this.scrollPosition(res);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    this._getBannerData();
    this._getHotData();
    this._getCourseData(0);
    this._getCourseData(1);
    this._getCourseData(2);
    this.onImageLoad();
  },
  //----网络请求函数----
  _getBannerData() {
    getBannerData().then(res => {
      const banners = res.data.content;
      //将数据放入data
      this.setData({
        banners: banners
      })
    })
  },
  _getHotData() {
    getHotData().then(res => {
      const hotCourse = res.data.content;
      //将数据放入data
      this.setData({
        hotCourse: hotCourse
      })
    })
  },
  _getCourseData(type) {
    const pageNum = this.data.course[type].pageNum;
    getCourseData(type, pageNum).then( res=>{
      const list = res.data.content.result;
      const oldList = this.data.course[type].list;
      oldList.push(...list);
      //替换

      const typeKay = `course.${type}.list`;
      const pageKey = `course.${type}.pageNum`;
      this.setData({
        [typeKay]: oldList,
        [pageKey]: pageNum + 1
      })
    })
  },
  //----事件监听----
  handleTabClick(event) {
    const index = event.detail.index;

    // this._getCourseData(index);
    //设置currentType
    this.setData({
      currentType: index
    })
    this.selectComponent('.tab-control').setCurrentIndex(event.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(event.detail.index)
  },

  onReachBottom() {
    //上拉加载更多
    this._getCourseData(this.data.currentType)
  }
})