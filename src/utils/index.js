export const handleScroll = (id) => {
  const element = document.getElementById(id);
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
};
