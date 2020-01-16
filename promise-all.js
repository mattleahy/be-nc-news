const doPromises = () => {
  return Promise.all(["checkAuthor", "checkTopic"]).then(array => {});
};

doPromises();
