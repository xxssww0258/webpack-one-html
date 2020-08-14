export const isBrowser = typeof window !== 'undefined'
export const UA = isBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isApp = UA && (isAndroid || isIOS) // 这个东西包括了 下面那个

// export const isMobile = UA && /applewebkit.*mobile.*/.test(UA); // 是否为移动终端

export const isWechat = UA && /micromessenger/.test(UA) // 是否微信
