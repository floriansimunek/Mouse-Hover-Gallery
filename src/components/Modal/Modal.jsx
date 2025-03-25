import gsap from 'gsap';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import styles from './Modal.module.css';

const ANIMATION_CONFIG = {
  container: { duration: 0.8, ease: 'power3' },
  cursor: { duration: 0.5, ease: 'power3' },
  cursorLabel: { duration: 0.45, ease: 'power3' },
  modal: {
    initial: { scale: 0, x: '-50%', y: '-50%' },
    enter: { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
  },
};

function Modal({ modal, projects }) {
  const modalContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const scaleAnimation = useMemo(() => ANIMATION_CONFIG.modal, []);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainerRef.current, 'left', ANIMATION_CONFIG.container);
    const yMoveContainer = gsap.quickTo(modalContainerRef.current, 'top', ANIMATION_CONFIG.container);

    const xMoveCursor = gsap.quickTo(cursorRef.current, 'left', ANIMATION_CONFIG.cursor);
    const yMoveCursor = gsap.quickTo(cursorRef.current, 'top', ANIMATION_CONFIG.cursor);

    const xMoveCursorLabel = gsap.quickTo(cursorLabelRef.current, 'left', ANIMATION_CONFIG.cursorLabel);
    const yMoveCursorLabel = gsap.quickTo(cursorLabelRef.current, 'top', ANIMATION_CONFIG.cursorLabel);

    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;

      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div ref={modalContainerRef} variants={scaleAnimation} initial="initial" animate={modal.active ? 'enter' : 'closed'} className={styles.modalContainer}>
        <div style={{ transform: `translateY(${modal.index * -100}%)` }} className={styles.modalSlider}>
          {projects.map((project, index) => (
            <div className={styles.modal} style={{ backgroundColor: project.color }} key={`modal_${index}`}>
              <img src={`/assets/${project.src}`} width="75%" height="auto" loading="lazy" alt={`Project ${index + 1}`} />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div ref={cursorRef} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={modal.active ? 'enter' : 'closed'} />
      <motion.div ref={cursorLabelRef} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={modal.active ? 'enter' : 'closed'}>
        View
      </motion.div>
    </>
  );
}

export default Modal;
