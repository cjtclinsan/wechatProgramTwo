// components/w-course-item/w-course-item.js
import {
  imageURL
} from '../../service/config.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courselist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageURL: imageURL
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
