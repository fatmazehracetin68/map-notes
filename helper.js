export const detecType = (type) => {
  switch (type) {
    case "park":
      return "Park Yeri";
    case "home":
      return "Ev";
    case "job":
      return "İş";
    case "goto":
      return "Ziyaret";
  }
};

export const setStorage = (data) => {
  const strData = JSON.stringify(data);
  localStorage.setItem("notes", strData);
};

var carIcon = L.icon({
  iconUrl: "./img/car.png",
  iconSize: [50, 60],
});

var homeIcon = L.icon({
  iconUrl: "./img/home-marker.png",
  iconSize: [50, 60],
});

var jobIcon = L.icon({
  iconUrl: "./img/job.png",
  iconSize: [50, 60],
});

var visitIcon = L.icon({
  iconUrl: "./img/visit.png",
  iconSize: [50, 60],
});

export const detecIcon = (type) => {
  switch (type) {
    case "park":
      return carIcon;
    case "home":
      return homeIcon;
    case "goto":
      return visitIcon;
    case "job":
      return jobIcon;
  }
};
