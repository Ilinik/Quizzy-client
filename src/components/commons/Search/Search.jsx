import styles from './Search.module.css';

export const Search = ({ className }) => {
  return (
    <div className={styles.search}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="Найти квиз"
          className={styles.searchInput}
        />
        <img
          src="/images/search/search.svg"
          alt="search"
          className={styles.searchIcon}
        />
      </div>
      <button className={styles.searchButton}>
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{' '}
          </g>
        </svg>
      </button>
    </div>
  );
};
