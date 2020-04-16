/**
 * 获取本地存储
 * @param {String} key 键
 */
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify({}));
}
/**
 * 获取本地存储
 * @param {String} key 键
 * @param {String} value 值
 */
export function setLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 设置会话
 * @param {String} key 键
 * @param {String} value 值
 */
export function setSessionStorage(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 获取会话
 * @param {String} key 键
 */
export function getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key) || JSON.stringify({}));
}
