import { motion } from 'framer-motion';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="font-headline text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
      <div>
        {children}
      </div>
    </motion.div>
  );
}
