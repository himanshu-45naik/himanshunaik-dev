import ThemeToggle from "./ThemeToggle.jsx";
import { profile } from "../data.js";

// Top row: photo on the left, theme switch on the right.
export default function Header() {
  return (
    <header className="header">
      <img
        className="avatar"
        src={profile.photo}
        alt={profile.fullName}
      />
      <ThemeToggle />
    </header>
  );
}
