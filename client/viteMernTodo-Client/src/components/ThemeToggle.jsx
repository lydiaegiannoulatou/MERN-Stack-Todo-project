import { Sun, Moon } from 'lucide-react';
import PropTypes from 'prop-types';

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="theme-toggle-icon">
        <Sun className="sun-icon" />
        <Moon className="moon-icon" />
      </div>
    </button>
  );
}

ThemeToggle.propTypes = {
  isDark: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;