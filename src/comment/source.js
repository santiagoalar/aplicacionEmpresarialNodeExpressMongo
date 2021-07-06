export default function buildMakeSource ({ isValidIp }) {
  return function makeSource ({ ip, browser, referrer } = {}) {
    if (!ip) {
      //throw new Error('Comment source must contain an IP.')
      throw new Error('La fuente del comentario debe contener una ip.');
    }
    if (!isValidIp(ip)) {
      //throw new RangeError('Comment source must contain a valid IP.');
      throw new RangeError('La fuente del comentario debe contener una ip válida.')
    }
    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    })
  }
}
