import styles from './Project.module.css';

function Project({ index, title, setModal }) {
  function enableModal() {
    setModal({ active: true, index });
  }

  function disableModal() {
    setModal({ active: false, index });
  }

  return (
    <div className={styles.project} onMouseEnter={enableModal} onMouseLeave={disableModal}>
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  );
}

export default Project;
