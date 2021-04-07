handleGithubPages(window.location);

export function handleGithubPages(location: Location) {
  // function for github pages
  // gh pages doesn't support history router
  if (location.search[1] === "/") {
    // redirect from 404.html
    // path contain ? and started with ?/
    const decoded = location.search
      .slice(1)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");

    // redirect to origin path
    window.history.replaceState(
      null,
      "",
      location.pathname.slice(0, -1) + decoded + location.hash
    );
  }
}
