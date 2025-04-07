import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  id: string;
  background?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
}

const SectionWrapper = (props: Props) => {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id={props.id}
      className={cn("section-wrapper", props.className)}
      style={{
        backgroundImage: props.background ? `url(${props.background})` : undefined,
        backgroundColor: props.backgroundColor || undefined
      }}
    >
      {props.children}
    </section>
  );
};

export default SectionWrapper;
