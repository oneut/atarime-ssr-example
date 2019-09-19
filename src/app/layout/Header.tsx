import * as React from "react";
import { Link, URL } from "atarime";

export function Header() {
  return (
    <header className="navbar navbar-expand-lg bg-light text-white mb-3">
      <div className="container">
        <div className="navbar-brand mb-0 h1">
          <Link to={URL.name("IndexPage")} className="text-black-50">
            Redux Example - Hacker News
          </Link>
        </div>
      </div>
    </header>
  );
}
