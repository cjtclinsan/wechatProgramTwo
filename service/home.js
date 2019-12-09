import request from './network.js'

import courseRequest from './course.js'

export function getBannerData() {
  return courseRequest({
    url: '/rotation/rotationList'
  })
}

export function getHotData(){
  return courseRequest({
    url: '/course/listHotCourse'
  })
}

export function getCourseData(findType, pageNum){
  return courseRequest({
    url: '/course/listCourse',
    data: {
      findType,
      pageNum
    }
  })
}



