import clsx from 'clsx';
import styles from './Loader.module.scss';

const Loader = ({ color = 'primary', size = 'md', className }) => {
  return (
    <span
      className={clsx(styles.loader, styles[color], styles[size], className)}
    />
  );
};

export default Loader;
