import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'purple';
}

export default function AnimatedBackground({ children, variant = 'green' }: AnimatedBackgroundProps) {
  const colorVariants = {
    green: {
      bg: 'from-green-50 via-emerald-50 to-teal-50',
      circles: 'from-green-200/20 to-emerald-200/20'
    },
    blue: {
      bg: 'from-blue-50 via-sky-50 to-cyan-50',
      circles: 'from-blue-200/20 to-sky-200/20'
    },
    purple: {
      bg: 'from-purple-50 via-violet-50 to-indigo-50',
      circles: 'from-purple-200/20 to-violet-200/20'
    }
  };

  const colors = colorVariants[variant];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r ${colors.circles} blur-xl`}
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: Math.random() * 120 - 10 + '%',
              top: Math.random() * 120 - 10 + '%',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${colors.circles}`}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}