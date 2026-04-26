import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
      style={{
        position: 'fixed', inset: 0, background: '#0f1117',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}
      >
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(99,102,241,0.4)',
        }}>
          <Zap size={22} color="#fff" fill="#fff" />
        </div>
        <span style={{
          fontSize: 26, fontWeight: 700, color: '#f0f0f0',
          letterSpacing: '-0.03em',
        }}>
          FlowScan
        </span>
      </motion.div>

      {/* Progress bar track */}
      <div style={{
        width: 200, height: 3, background: '#1e2130',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={onComplete}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
            borderRadius: 2,
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{ marginTop: 18, fontSize: 12, color: '#4b5563', letterSpacing: '0.02em' }}
      >
        Loading workflow canvas…
      </motion.p>
    </motion.div>
  );
}
