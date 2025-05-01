
const observeElement = (elem, func, threshold = 0.1 ) => {
  if (!elem) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      func();
      observer.unobserve(entry.target);
    })
  }, {threshold})

  observer.observe(elem);

  return () => {
    observer.disconnect();
  }
}

export default observeElement;