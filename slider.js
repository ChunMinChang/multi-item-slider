let sliderSetting = {
  offset: 0,
  width: 0,
  items: 0,
  itemWidth: 0,
}

function updatePosition(offset) {
  let silderWindow = document.querySelector(".slider .window");
  let itemWidth = parseInt(sliderSetting.itemWidth);
  silderWindow.style.left = -1 * offset * itemWidth;
}

function updateOffset(setting, dir) {
  if (!setting.items) {
    console.log("No items to scroll!");
    return false;
  }
  console.log("number of items: " + sliderSetting.items);

  if (!sliderSetting.width || !sliderSetting.itemWidth) {
    console.log("Need to wait to get css settings!");
    return false;
  }
  console.log("slider width: " + setting.width +
              ", item width: " + setting.itemWidth);

  // Get pure values of the width of slider and item without unit(px).
  let sliderWidth = parseInt(setting.width);
  let itemWidth = parseInt(setting.itemWidth);

  let itemsInWindow = Math.round(sliderWidth / itemWidth);
  console.log("items in window: " + itemsInWindow);

  if (setting.items <= itemsInWindow) {
    return false;
  }

  let maxOffset = setting.items - itemsInWindow;
  let round = maxOffset + 1;
  let move = dir == "left" ? -1 : 1;
  setting.offset = (setting.offset + move + round) % round;
  console.log("offset : " + setting.offset);
  return true;
}

function scroll(dir) {
  console.log("scroll " + dir);
  if (updateOffset(sliderSetting, dir)) {
    updatePosition(sliderSetting.offset);
  }
}

function setSlider() {
  let silderWindow = document.querySelector(".slider .window");
  sliderSetting.items = silderWindow.querySelectorAll(".item").length;

  let slider = document.querySelector(".slider");
  sliderSetting.width = window.getComputedStyle(slider).width;

  let silderItem = document.querySelector(".slider .window .item");
  sliderSetting.itemWidth = window.getComputedStyle(silderItem).width;
}

function registerEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

function registerButtonEvents() {
  let leftBtn = document.querySelector(".slider .left");
  registerEvent(leftBtn, "click", function(e) { scroll("left"); });

  let rightBtn = document.querySelector(".slider .right");
  registerEvent(rightBtn, "click", function(e) { scroll("right"); });
}

document.addEventListener("readystatechange", event => {
  switch (event.target.readyState) {
    case "loading":
      console.log("The document is loading...");
      break;
    case "interactive":
      console.log("The document is loaded but subresources " +
                  "like images, css may still be loading.");
      // Init.
      registerButtonEvents();
      break;
    case "complete":
      console.log("The page is fully loaded!");
      // Get css values.
      setSlider();
      break;
    default:
      console.error("This browser doesn't follow the DOM Event spec!");
      break;
  }
});