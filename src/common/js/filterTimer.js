/* 全局过滤器定义 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(rTime)

const fill0 = (val) => {
  return val < 10 ? '0' + val : val
}
// 格式化日期
const formatDate = (value, type) => {
  value = new Date(value).getTime()
  let d;
  switch (type) {
    case 'type1':
      d = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      // d = dayjs(value).format('YYYY-MM-DD HH:mm:ss dddd')
      break;
    case 'type2':
      d = dayjs(value).format('YYYY-MM-DD')
      break;
    case 'type3':
      d = dayjs(value).format('YYYY.MM.DD HH.MM')
      break;
    case 'date':
      d = dayjs(value).format('YYYY年MM月DD')
      break;
    case 'hour':
      d = dayjs(value).format('HH:mm:ss')
      break;
    case 'dateAndHour':
      d = dayjs(value).format('YYYY年MM月DD HH:mm:ss')
      break;
    case 'birth':
      d = value && Math.floor((new Date() - value) / 1000 / 3600 / 24 / 365)
      break;
    case 'studyTime':
      d = value && value.substring(0, value.indexOf("T"));
      break;
    case 'ZN':
      d = dayjs(value).format('YYYY年MM月DD dddd')
      break
    case 'getDate':
      let tem = new Date(value)
      d = `${tem.getFullYear()}-${fill0(tem.getMonth() + 1)}-${fill0(tem.getDate())}`
      break;
    case 'distanceTime':
      d = dayjs().to(dayjs(value))
      break;
  }
  return d
}

const fillDotted = (num) => {
  if (num === 0) return '-'
  if (typeof num === 'string') {
    return num
  } else {
    let x = String(num).indexOf(".") + 1;
    let r = String(num).substr(x)

    if (r.length > 2) {
      return num.toFixed(2)
    }

    return r.length === 1 ? `￥${num}0` : r.length === 0 ? `￥${num}.00` : num
  }
}


const filters = {
  formatDate,
  fill0,
  fillDotted
}



export default filters
