export const iconMap = new Map();

function createMapping(iconCodes, icon) {
  iconCodes.forEach((iconCode) => {
    iconMap.set(iconCode, icon);
  });
}

createMapping([0, 1], "sun");
createMapping([2], "cloud-sun");
createMapping([3], "cloud");
createMapping([45, 48], "smog");
createMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "cloud-showers-heavy");
createMapping([71, 73, 75, 77, 85, 86], "snowflake");
createMapping([95, 96, 99], "cloud-bolt");
