import { useState } from 'react';
import styles from './App.module.css';
import image1 from './assets/c2montreal.png';
import image3 from './assets/locomotive.png';
import image2 from './assets/officestudio.png';
import image4 from './assets/silencio.png';
import Modal from './components/Modal';
import Project from './components/Project';

function App() {
  const projects = [
    {
      title: 'C2 Montreal',
      src: image1,
      color: '#000000',
    },
    {
      title: 'Office Studio',
      src: image2,
      color: '#8C8C8C',
    },
    {
      title: 'Locomotive',
      src: image3,
      color: '#EFE8D3',
    },
    {
      title: 'Silencio',
      src: image4,
      color: '#706D63',
    },
  ];

  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className={styles.main}>
      <div className={styles.body}>
        {projects.map((project, index) => (
          <Project index={index} title={project.title} setModal={setModal} key={index} />
        ))}
      </div>

      <Modal modal={modal} projects={projects} />
    </main>
  );
}

export default App;
