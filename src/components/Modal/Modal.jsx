import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';

function Modal({ modal, projects }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [labelPosition, setLabelPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
  }

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.pageX, y: e.pageY });
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animatePositions = () => {
      setModalPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.06),
        y: lerp(prev.y, mousePosition.y, 0.06),
      }));
      setCursorPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.12),
        y: lerp(prev.y, mousePosition.y, 0.12),
      }));
      setLabelPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.18),
        y: lerp(prev.y, mousePosition.y, 0.18),
      }));
      animationFrameRef.current = requestAnimationFrame(animatePositions);
    };

    animationFrameRef.current = requestAnimationFrame(animatePositions);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePosition]);

  const containerClass = modal.active ? `${styles.modalContainer} ${styles.active}` : styles.modalContainer;
  const cursorClass = modal.active ? `${styles.cursor} ${styles.active}` : styles.cursor;
  const labelClass = modal.active ? `${styles.cursorLabel} ${styles.active}` : styles.cursorLabel;

  return (
    <>
      <div className={containerClass} style={{ left: `${modalPosition.x}px`, top: `${modalPosition.y}px` }}>
        <div className={styles.modalSlider} style={{ transform: `translateY(${modal.index * -100}%)` }}>
          {projects.map((project, index) => (
            <div className={styles.modal} style={{ backgroundColor: project.color }} key={`modal_${index}`}>
              <img src={`/assets/${project.src}`} width="75%" height="auto" loading="lazy" alt={`Project ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={cursorClass} style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }} />
      <div className={labelClass} style={{ left: `${labelPosition.x}px`, top: `${labelPosition.y}px` }}>
        View
      </div>
    </>
  );
}

export default Modal;
