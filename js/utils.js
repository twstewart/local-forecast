import { iconMap } from "./icon-map";

export function navigatorGeolocationPromise() {
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function setDOMValue(selector, value, { parent = document } = {}) {
  parent.querySelector(selector).textContent = value;
}

export function getIconUrl(iconCode) {
  return `icons/${iconMap.get(iconCode)}.svg`;
}

export function dayFormatter(day, formatStyle = "long") {
  return new Intl.DateTimeFormat(undefined, {
    weekday: formatStyle,
  }).format(day);
}

export function hourFormatter(time, formatStyle = "numeric") {
  return new Intl.DateTimeFormat(undefined, {
    hour: formatStyle,
  }).format(time);
}

export function calcAvg(...values) {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}
